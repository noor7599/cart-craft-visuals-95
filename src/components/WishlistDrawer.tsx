
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function WishlistDrawer() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label={t("myWishlist")}
        >
          <Heart className="h-4 w-4" />
          {wishlist.length > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
              variant="destructive"
            >
              {wishlist.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t("myWishlist")}</SheetTitle>
        </SheetHeader>
        
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your wishlist is empty.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-4 h-[calc(80vh-10rem)]">
              <div className="space-y-4">
                {wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <div className="h-16 w-16 overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {product.description}
                      </p>
                      <p className="font-medium mt-1">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddToCart(product)}
                        title={t("addToCart")}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromWishlist(product.id)}
                        title="Remove from wishlist"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </SheetClose>
              {wishlist.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={clearWishlist}
                  className="w-full"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Clear Wishlist
                </Button>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
