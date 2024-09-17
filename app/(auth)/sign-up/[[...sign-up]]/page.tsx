import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* Welcome section */}
      <div className="md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-indigo-700 to-purple-800">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Join Us Today!</h1>
          <p className="text-lg mb-4">
            Create an account to start your amazing journey with us.
          </p>
        </div>
      </div>

      {/* Sign-up section */}
      <div className="lg:w-1/2 p-5 flex items-center justify-center">
        <div className="w-full max-w-md">
          <SignUp
            appearance={{
              baseTheme: dark,
              elements: {
                card: "bg-gray-800 shadow-xl border border-gray-700",
                headerTitle: "text-2xl font-bold text-white",
                headerSubtitle: "text-gray-400",
                formButtonPrimary:
                  "bg-indigo-600 hover:bg-indigo-700 text-white",
                formFieldInput: "bg-gray-700 border-gray-600 text-white",
                formFieldLabel: "text-gray-300",
                footerActionLink: "text-indigo-400 hover:text-indigo-300",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
