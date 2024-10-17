import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Features() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Real-time Search
                <Badge variant="outline" className="ml-2">Up to Date</Badge>
              </CardTitle>
              <CardDescription>
                Quickly find the references you need with our powerful real-time search functionality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Search through weapons, vehicles, and peds with instant results.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Centralized Database
                <Badge variant="outline" className="ml-2">Up to Date</Badge>
              </CardTitle>
              <CardDescription>
                Access all your game references from a single, organized database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Save time and effort by having all your references in one place.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                User-Friendly Interface
                <Badge variant="outline" className="ml-2">Up to Date</Badge>
              </CardTitle>
              <CardDescription>
                Enjoy a seamless experience with our intuitive and easy-to-use interface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Designed specifically for developers to enhance productivity.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
