import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema, type SignUpData } from "@shared/schema";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authService.login(email, password);
      if (user) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        setLocation("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Please enter valid credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    setIsLoading(true);

    try {
      const user = await authService.signUp(data);
      if (user) {
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });
        setLocation("/dashboard");
      } else {
        toast({
          title: "Sign up failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSignUp) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-gray-200 rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black italic">Create Account</h2>
            </div>
            
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <Input
                  {...signUpForm.register("name")}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-400 rounded bg-white"
                />
                {signUpForm.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...signUpForm.register("email")}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-400 rounded bg-white"
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...signUpForm.register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-400 rounded bg-white"
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.password.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...signUpForm.register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-gray-400 rounded bg-white"
                />
                {signUpForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
            
            <div className="text-center mt-4">
              <button 
                onClick={() => setIsSignUp(false)}
                className="text-gray-700 hover:underline text-sm"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-200 rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black italic">Helpdesk System</h2>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 border border-gray-400 rounded bg-white"
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-400 rounded bg-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="flex justify-between mt-4 text-sm">
            <a href="#" className="text-red-500 hover:underline">Forgot password</a>
            <button 
              onClick={() => setIsSignUp(true)}
              className="text-gray-700 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
