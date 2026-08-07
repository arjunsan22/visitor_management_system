
import { Link } from "react-router-dom";

export const HeroSection = () => {
    return (
        <section className="flex flex-1 items-center justify-center px-6 py-20">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-xl">

                <div className="text-center">

                    <h2 className="text-4xl font-bold text-gray-900">
                        Welcome
                    </h2>

                    <p className="mt-4 text-lg text-gray-600">
                        Register your visit quickly and securely using the
                        Visitor Management System.
                    </p>


                </div>

                <div className="mt-10 flex flex-col items-center gap-6">

                    <Link
                        to="/visitor/new"
                        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-center text-lg font-semibold text-white transition hover:bg-blue-700"
                    >
                        New Visitor
                    </Link>

                    {/* Later condition */}
                    <button
                        className="text-blue-600 transition hover:text-blue-800"
                    >
                        Show My Pass
                    </button>

                </div>

            </div>

        </section>
    );
};