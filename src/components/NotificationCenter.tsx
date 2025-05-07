
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load notifications from localStorage on initial render
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        // Parse stored notifications and convert timestamps back to Date objects
        const parsed = JSON.parse(savedNotifications);
        const withDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(withDates);
      } catch (error) {
        console.error("Failed to parse notifications from localStorage:", error);
      }
    }
  }, []);
  
  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);
  
  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only the last 50 notifications
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  const clearByType = (type: "success" | "error" | "info") => {
    setNotifications(prev => prev.filter(notification => notification.type !== type));
  };
  
  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    clearByType,
  };
};

export const NotificationCenter = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    removeNotification,
    clearAll,
    clearByType 
  } = useNotifications();
  
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);
  
  const handleOpenChange = (open: boolean) => {
    // Mark all as read when closing the notification center
    if (!open) {
      markAllAsRead();
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  const getIcon = (type: "success" | "error" | "info") => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -right-1 -top-1 h-5 min-w-5 flex items-center justify-center rounded-full px-1 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-lg">Notifications</SheetTitle>
          <SheetDescription className="flex justify-between items-center">
            <span>Stay updated with order statuses and promotions.</span>
            {notifications.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead} 
                className="text-xs"
                disabled={unreadCount === 0}
              >
                Mark all as read
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>
        
        {notifications.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all" className="text-xs h-8 px-3">
                  All
                  <Badge className="ml-1 h-5 min-w-5" variant="outline">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="success" className="text-xs h-8 px-3">
                  <Check className="mr-1 h-3 w-3 text-green-500" />
                  Success
                </TabsTrigger>
                <TabsTrigger value="error" className="text-xs h-8 px-3">
                  <AlertCircle className="mr-1 h-3 w-3 text-red-500" />
                  Error
                </TabsTrigger>
                <TabsTrigger value="info" className="text-xs h-8 px-3">
                  <Info className="mr-1 h-3 w-3 text-blue-500" />
                  Info
                </TabsTrigger>
              </TabsList>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => activeTab === "all" ? clearAll() : clearByType(activeTab as any)}
                className="text-xs"
              >
                Clear {activeTab !== "all" ? activeTab : "all"}
              </Button>
            </div>
            
            <TabsContent value={activeTab} className="mt-0 max-h-[calc(80vh-180px)] overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4 py-4">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "flex items-start justify-between p-4 rounded-md border transition-colors",
                        !notification.read ? "bg-secondary/50" : "bg-background"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">{getIcon(notification.type)}</div>
                        <div>
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground">No notifications to display.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <Bell className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
            <h3 className="font-medium mb-1">No notifications yet</h3>
            <p className="text-muted-foreground text-sm">
              When you receive notifications, they'll appear here.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
