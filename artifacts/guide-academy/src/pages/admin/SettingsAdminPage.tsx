import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, Settings2, Globe, Phone, Mail, MapPin, Instagram, RefreshCw, Linkedin, Youtube, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetSettings, useUpdateSettings } from "@workspace/api-client-react";
import type { SiteSettingsUpdate } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function SettingsAdminPage() {
  const [form, setForm] = useState<SiteSettingsUpdate>({
    instituteName: "",
    tagline: "",
    logoUrl: "",
    phone: "+91 9509174366",
    whatsapp: "+91 9509174366",
    email: "enquirytheguide@gmail.com",
    instagram: "https://www.instagram.com/the_guide_fire_safety_academy",
    linkedin: "https://in.linkedin.com/in/abdul-rashid-khokhar-338318126",
    youtube: "https://youtube.com/@tgia-rj23",
    address: "Opp Indian Mobile, Railway Station, Kalyan Circle, Station Road, Sikar - 332001, Rajasthan, India",
    heroBannerUrl: "",
  });
  const [saving, setSaving] = useState(false);

  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: settings, isLoading } = useGetSettings({ query: { queryKey: ["admin-settings"] } });
  const updateSettings = useUpdateSettings();

  useEffect(() => {
    if (settings) {
      setForm({
        instituteName: settings.instituteName ?? "THE GUIDE International Academy",
        tagline: settings.tagline ?? "We Guide the Future Leaders",
        logoUrl: settings.logoUrl ?? "",
        phone: settings.phone ?? "+91 9509174366",
        whatsapp: settings.whatsapp ?? "+91 9509174366",
        email: settings.email ?? "enquirytheguide@gmail.com",
        instagram: settings.instagram ?? "https://www.instagram.com/the_guide_fire_safety_academy",
        linkedin: settings.linkedin ?? "https://in.linkedin.com/in/abdul-rashid-khokhar-338318126",
        youtube: settings.youtube ?? "https://youtube.com/@tgia-rj23",
        address: settings.address ?? "Opp Indian Mobile, Railway Station, Kalyan Circle, Station Road, Sikar - 332001, Rajasthan, India",
        heroBannerUrl: settings.heroBannerUrl ?? "",
      });
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings.mutateAsync({ data: form });
      toast({ title: "Settings saved successfully" });
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings-nav"] });
    } catch {
      toast({ title: "Failed to save settings", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const fields: Array<{ key: keyof SiteSettingsUpdate; label: string; icon: React.ElementType; placeholder: string; long?: boolean; section?: string }> = [
    { key: "instituteName", label: "Institute Name", icon: Globe, placeholder: "THE GUIDE International Academy", section: "General" },
    { key: "tagline", label: "Tagline", icon: Globe, placeholder: "We Guide the Future Leaders", long: true, section: "General" },
    { key: "logoUrl", label: "Logo URL", icon: Image, placeholder: "/logo.jpg or https://...", section: "General" },
    { key: "heroBannerUrl", label: "Director Photo URL", icon: Image, placeholder: "/director-photo.jpg or https://...", section: "General" },
    { key: "phone", label: "Phone Number", icon: Phone, placeholder: "+91 9509174366", section: "Contact" },
    { key: "whatsapp", label: "WhatsApp Number", icon: Phone, placeholder: "+91 9509174366", section: "Contact" },
    { key: "email", label: "Email Address", icon: Mail, placeholder: "enquirytheguide@gmail.com", section: "Contact" },
    { key: "address", label: "Address", icon: MapPin, placeholder: "Opp Indian Mobile, Station Road...", long: true, section: "Contact" },
    { key: "instagram", label: "Instagram URL", icon: Instagram, placeholder: "https://www.instagram.com/...", section: "Social" },
    { key: "linkedin", label: "LinkedIn URL", icon: Linkedin, placeholder: "https://linkedin.com/in/...", section: "Social" },
    { key: "youtube", label: "YouTube URL", icon: Youtube, placeholder: "https://youtube.com/@...", section: "Social" },
  ];

  const sections = ["General", "Contact", "Social"];

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Site Settings</h2>
            <p className="text-sm text-muted-foreground">Update your institute's public information and social links</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map(section => (
              <div key={section} className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">{section}</h3>
                {fields.filter(f => f.section === section).map(field => {
                  const Icon = field.icon;
                  return (
                    <div key={field.key} className="space-y-1.5">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        {field.label}
                      </Label>
                      {field.long ? (
                        <Textarea
                          value={(form[field.key] as string) ?? ""}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          rows={2}
                          className="resize-none"
                        />
                      ) : (
                        <Input
                          value={(form[field.key] as string) ?? ""}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground gap-2">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
