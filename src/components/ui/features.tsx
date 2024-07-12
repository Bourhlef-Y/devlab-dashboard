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
                Quickly find what you need with our real-time search functionality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Search through weapons, vehicles, and peds with instant results.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Easy Clipboard Copy
                <Badge variant="outline" className="ml-2">Up to Date</Badge>
              </CardTitle>
              <CardDescription>
                Simplify your workflow with easy copy-to-clipboard features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Copy IDs and information with a single click.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Detailed Filtering
                <Badge variant="outline" className="ml-2">Up to Date</Badge>
              </CardTitle>
              <CardDescription>
                Filter by categories to find exactly what you need.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Organize and filter your data by specific categories for quick access.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
