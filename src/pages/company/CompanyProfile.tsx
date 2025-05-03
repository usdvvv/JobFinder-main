
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Building2, Mail, MapPin, Phone, Globe } from 'lucide-react';
import CompanyNavBar from '@/components/company/CompanyNavBar';

const profileFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  industry: z.string().min(2, {
    message: "Industry must be at least 2 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }),
  about: z.string().min(10, {
    message: "About must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This simulates a company profile that would come from a database
const defaultValues: Partial<ProfileFormValues> = {
  companyName: "Acme Corporation",
  industry: "Technology",
  website: "https://www.acmecorp.example.com",
  about: "Acme Corporation is a technology company focused on creating innovative solutions for businesses of all sizes. Founded in 2010, we have grown to become a leader in our space with clients worldwide.",
  email: "info@acmecorp.example.com",
  phone: "(555) 123-4567",
  address: "123 Tech Street, San Francisco, CA 94107",
};

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your company profile has been updated successfully.",
    });
    setIsEditing(false);
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyNavBar />
      
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Company Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your company information</p>
          </div>
          
          {!isEditing && (
            <Button 
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
        
        <Card className="border border-border/40 shadow-sm">
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Edit Company Information</CardTitle>
                  <CardDescription>
                    Update your company details and public profile information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input placeholder="Industry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your company..." 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This information will be displayed publicly on your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Street, City, State, ZIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Form>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Your company details and public profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="h-24 w-24 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-blue-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{defaultValues.companyName}</h2>
                    <p className="text-muted-foreground">{defaultValues.industry}</p>
                    <div className="flex items-center mt-2 text-blue-600">
                      <Globe className="h-4 w-4 mr-1" />
                      <a href={defaultValues.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {defaultValues.website}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {defaultValues.about}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{defaultValues.email}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{defaultValues.phone}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{defaultValues.address}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;
