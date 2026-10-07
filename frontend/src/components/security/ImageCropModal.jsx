import React, { useState, useEffect, useRef } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { uploadVisitorImage } from "../../api/visitor/visitorApi";

export const ImageCropModal = ({
  isOpen,
  onClose,
  imageFile,
  imageSrc: initialImageSrc,
  token,
  visitorToken,
  onSuccess,
  onUploadSuccess,
  showToast,
}) => {
  const imageElementRef = useRef(null);
  const cropperRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const effectiveToken = token || visitorToken;
  const notifySuccess = onSuccess || onUploadSuccess;

  // Convert File to DataURL if needed
  useEffect(() => {
    if (!isOpen) {
      setImageSrc(null);
      return;
    }

    if (initialImageSrc) {
      setImageSrc(initialImageSrc);
    } else if (imageFile) {
      if (typeof imageFile === "string") {
        setImageSrc(imageFile);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(imageFile);
      }
    }
  }, [isOpen, imageFile, initialImageSrc]);

  // Initialize pure Cropper.js directly on the image element
  useEffect(() => {
    if (!isOpen || !imageSrc || !imageElementRef.current) return;

    // Clean up any previous cropper
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }

    const img = imageElementRef.current;

    // Initialize Cropper once image is in DOM
    const cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 0.9,
      dragMode: "move",
      responsive: true,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      checkCrossOrigin: false,
    });

    cropperRef.current = cropper;

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
    };
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (loading) return;
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
    setImageSrc(null);
    onClose();
  };

  const handleCrop = async () => {
    const cropper = cropperRef.current;
    if (!cropper) {
      if (showToast) showToast("Cropper is loading, please wait", "warning");
      return;
    }

    setLoading(true);

    try {
      let canvas = null;

      // 1. Try getCroppedCanvas with options
      try {
        canvas = cropper.getCroppedCanvas({
          width: 400,
          height: 400,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high",
        });
      } catch (err) {
        console.warn("cropper.getCroppedCanvas with options failed:", err);
      }

      // 2. Try getCroppedCanvas without options
      if (!canvas) {
        try {
          canvas = cropper.getCroppedCanvas();
        } catch (err) {
          console.warn("cropper.getCroppedCanvas without options failed:", err);
        }
      }

      // 3. Fail-safe fallback: Manual crop directly from the image element using crop data
      if (!canvas && imageElementRef.current) {
        try {
          const data = cropper.getData(true);
          const manualCanvas = document.createElement("canvas");
          manualCanvas.width = 400;
          manualCanvas.height = 400;
          const ctx = manualCanvas.getContext("2d");
          ctx.drawImage(
            imageElementRef.current,
            Math.max(0, data.x),
            Math.max(0, data.y),
            data.width || imageElementRef.current.naturalWidth,
            data.height || imageElementRef.current.naturalHeight,
            0,
            0,
            400,
            400
          );
          canvas = manualCanvas;
        } catch (manualErr) {
          console.warn("Manual canvas fallback error:", manualErr);
        }
      }

      if (!canvas) {
        throw new Error("Failed to process cropped image");
      }

      // Convert canvas to Blob safely
      const blob = await new Promise((resolve) => {
        if (canvas.toBlob) {
          canvas.toBlob((b) => {
            if (b) {
              resolve(b);
            } else {
              const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
              const arr = dataUrl.split(",");
              const mime = arr[0].match(/:(.*?);/)[1];
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              resolve(new Blob([u8arr], { type: mime }));
            }
          }, "image/jpeg", 0.9);
        } else {
          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          const arr = dataUrl.split(",");
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          resolve(new Blob([u8arr], { type: mime }));
        }
      });

      if (!blob) {
        throw new Error("Failed to create image file");
      }

      const formData = new FormData();
      formData.append("image", blob, "visitor-image.jpg");

      const res = await uploadVisitorImage(effectiveToken, formData);
      const imagePath = res.data?.image || res.image;

      if (showToast) {
        showToast("Image uploaded successfully!", "success");
      }
      if (notifySuccess) {
        notifySuccess(imagePath);
      }
      handleClose();
    } catch (err) {
      console.error("Cropping/upload error:", err);
      if (showToast) showToast(err.message || "Failed to crop image", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#10162A] p-6 shadow-2xl">
        <h3 className="font-display mb-4 text-xl font-semibold text-white">
          Crop Visitor Photo
        </h3>

        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl bg-black/50 sm:h-80 flex items-center justify-center">
          {imageSrc ? (
            <div className="h-full w-full">
              <img
                ref={imageElementRef}
                src={imageSrc}
                alt="Source preview"
                style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
              />
            </div>
          ) : (
            <div className="font-tag text-xs tracking-widest text-gray-400">
              Loading image...
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg border border-white/10 px-5 py-2.5 font-tag text-xs tracking-widest text-gray-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleCrop}
            disabled={loading}
            className="corner-mark group inline-flex items-center gap-2 rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2.5 font-tag text-xs font-medium tracking-widest text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20 disabled:opacity-50"
          >
            {loading ? "UPLOADING..." : "CROP & UPLOAD"}
          </button>
        </div>
      </div>
    </div>
  );
};
