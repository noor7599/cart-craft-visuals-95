
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, LogIn, LogOut, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AuthButtons = () => {
  const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    if (!loginForm.email) newErrors.loginEmail = "Email is required";
    if (!loginForm.password) newErrors.loginPassword = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    if (!registerForm.name) newErrors.registerName = "Name is required";
    if (!registerForm.email) newErrors.registerEmail = "Email is required";
    if (!registerForm.password) newErrors.registerPassword = "Password is required";
    if (registerForm.password.length < 6) 
      newErrors.registerPassword = "Password must be at least 6 characters";
    if (registerForm.password !== registerForm.confirmPassword) 
      newErrors.registerConfirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await login(loginForm.email, loginForm.password);
      setOpen(false);
      // Reset form
      setLoginForm({ email: "", password: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await register(registerForm.name, registerForm.email, registerForm.password);
      setOpen(false);
      // Reset form
      setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[`login${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors(prev => ({
        ...prev,
        [`login${name.charAt(0).toUpperCase() + name.slice(1)}`]: ""
      }));
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[`register${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors(prev => ({
        ...prev,
        [`register${name.charAt(0).toUpperCase() + name.slice(1)}`]: ""
      }));
    }
  };

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="User menu">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/orders" className="cursor-pointer">
              My Orders
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/profile" className="cursor-pointer">
              Profile Settings
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserRound className="h-4 w-4" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>
                  Access your account to view orders and checkout faster.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center justify-between">
                    Email
                    {errors.loginEmail && (
                      <span className="text-xs text-destructive">{errors.loginEmail}</span>
                    )}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    className={errors.loginEmail ? "border-destructive" : ""}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password" className="flex items-center justify-between">
                    Password
                    {errors.loginPassword && (
                      <span className="text-xs text-destructive">{errors.loginPassword}</span>
                    )}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    className={errors.loginPassword ? "border-destructive" : ""}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </DialogFooter>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Demo credentials: demo@example.com / password</p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit}>
              <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
                <DialogDescription>
                  Join to enjoy faster checkout and order tracking.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="flex items-center justify-between">
                    Full Name
                    {errors.registerName && (
                      <span className="text-xs text-destructive">{errors.registerName}</span>
                    )}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    className={errors.registerName ? "border-destructive" : ""}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="registerEmail" className="flex items-center justify-between">
                    Email
                    {errors.registerEmail && (
                      <span className="text-xs text-destructive">{errors.registerEmail}</span>
                    )}
                  </Label>
                  <Input
                    id="registerEmail"
                    name="email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    className={errors.registerEmail ? "border-destructive" : ""}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="registerPassword" className="flex items-center justify-between">
                    Password
                    {errors.registerPassword && (
                      <span className="text-xs text-destructive">{errors.registerPassword}</span>
                    )}
                  </Label>
                  <Input
                    id="registerPassword"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    className={errors.registerPassword ? "border-destructive" : ""}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="flex items-center justify-between">
                    Confirm Password
                    {errors.registerConfirmPassword && (
                      <span className="text-xs text-destructive">{errors.registerConfirmPassword}</span>
                    )}
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    className={errors.registerConfirmPassword ? "border-destructive" : ""}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserRound className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
