export const validateVisitorPass = (visitorPass) => {
    if (!visitorPass) return false;

    // 1. Check visit_date first (Independent of check_out_at)
    // This prevents a pass from yesterday from showing up today, even if checkout time was never set.
    if (visitorPass.visit_date) {
        const visitDate = new Date(visitorPass.visit_date);
        const today = new Date();
        
        // Reset times to compare purely by date
        today.setHours(0, 0, 0, 0);
        visitDate.setHours(0, 0, 0, 0);
        
        if (today.getTime() > visitDate.getTime()) {
            return false; // Expired because it's past the visit date
        }
    }

    // 2. Check check_out_at time
    // check_out_at is a TIME type in database (e.g., "14:30:00" or "14:30")
    if (visitorPass.check_out_at) {
        console.log("Checking check_out_at:", visitorPass.check_out_at);
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        
        // Split works perfectly for "HH:MM:SS" or "HH:MM"
        const [checkoutHours, checkoutMinutes] = visitorPass.check_out_at.split(':').map(Number);
        
        // If the current time has passed the checkout time
        if (currentHours > checkoutHours || (currentHours === checkoutHours && currentMinutes >= checkoutMinutes)) { //11 === 10 && 14 >= 10
            return false; // Expired because current time passed checkout time
        }
    }

    return true; // Pass is valid
};

