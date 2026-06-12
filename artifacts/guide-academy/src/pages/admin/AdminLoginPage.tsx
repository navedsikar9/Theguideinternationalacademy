import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAdminLogin } from "@workspace/api-client-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const loginMutation = useAdminLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await loginMutation.mutateAsync({ data });
      if (result.success) {
        toast({ title: "Login Successful" });
        setLocation("/admin");
      } else {
        toast({ title: "Login Failed", description: result.message || "Invalid credentials", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Login Error", description: "Could not connect to server.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-sidebar to-sidebar z-0"></div>
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-sidebar-foreground/70 text-sm tracking-widest uppercase">THE GUIDE International Academy</p>
        </div>

        <div className="bg-card border border-sidebar-border rounded-xl shadow-2xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
