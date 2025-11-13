import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { MapPin, Zap, Star, Clock } from "lucide-react";

interface MarketplaceCardProps {
  seller: {
    name: string;
    avatar?: string;
    rating: number;
    location: string;
  };
  energy: {
    amount: number;
    pricePerKwh: number;
    totalPrice: number;
  };
  timeRemaining: string;
  distance: string;
}

export function MarketplaceCard({ seller, energy, timeRemaining, distance }: MarketplaceCardProps) {
  return (
    <Card className="hover-elevate">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              {seller.avatar ? <img src={seller.avatar} alt={seller.name} /> : seller.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-card-foreground">{seller.name}</div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{seller.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{seller.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Zap className="mr-1 h-3 w-3" />
            {energy.amount} kWh available
          </Badge>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Price per kWh</span>
            <span className="font-mono font-semibold">₹{energy.pricePerKwh.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Distance</span>
            <span className="text-sm">{distance}</span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center">
            <span className="font-medium">Total Cost</span>
            <span className="text-xl font-bold text-primary font-mono">₹{energy.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full"
          data-testid={`button-buy-energy-${seller.name.replace(/\s+/g, '-').toLowerCase()}`}
          onClick={() => console.log(`Buy energy from ${seller.name} triggered`)}
        >
          Buy Energy
        </Button>
      </CardContent>
    </Card>
  );
}
