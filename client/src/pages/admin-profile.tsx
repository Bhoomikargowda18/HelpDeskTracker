import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormData {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
  realName: string;
  accessLevel: string;
  projectAccessLevel: string;
}

export default function AdminProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = authService.getCurrentUser();

  const form = useForm<ProfileFormData>({
    defaultValues: {
      username: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      email: user?.email || "",
      realName: user?.name || "",
      accessLevel: user?.role || "",
      projectAccessLevel: user?.role || "",
    },
  });

  const handleUpdate = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    try {
      // Here you would make an API call to update the user profile
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">User Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 text-white rounded" style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}>
              Edit Account
            </div>
          </div>
          
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  Username
                </Label>
                <Input
                  {...form.register("username")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  Current Password
                </Label>
                <Input
                  type="password"
                  {...form.register("currentPassword")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  New Password
                </Label>
                <Input
                  type="password"
                  {...form.register("newPassword")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  {...form.register("confirmPassword")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  Email
                </Label>
                <Input
                  type="email"
                  {...form.register("email")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  Real Name
                </Label>
                <Input
                  {...form.register("realName")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  Access Level
                </Label>
                <Input
                  {...form.register("accessLevel")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 bg-gray-400 px-3 py-2 rounded text-white font-medium">
                  Project Access Level
                </Label>
                <Input
                  {...form.register("projectAccessLevel")}
                  className="bg-white border border-gray-300"
                />
              </div>
              <div></div>
            </div>
            
            <div className="pt-6">
              <Button 
                type="submit"
                disabled={isLoading}
                className="px-8 py-2 text-white font-medium rounded"
                style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}
              >
                {isLoading ? "Updating..." : "Update User"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}