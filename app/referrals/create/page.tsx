"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { User, Phone, FileText, Upload, CalendarIcon, Shield, Search, X, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const departments = [
  "Emergency Medicine",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "Internal Medicine",
  "Surgery",
  "Radiology",
  "Oncology",
  "Psychiatry",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Urology",
]

const urgencyLevels = [
  { value: "high", label: "High Priority", color: "urgent-red", description: "Immediate attention required" },
  { value: "medium", label: "Medium Priority", color: "warning-amber", description: "Urgent but not critical" },
  { value: "low", label: "Low Priority", color: "trust-green", description: "Routine referral" },
]

export default function CreateReferralPage() {
  const [date, setDate] = useState<Date>()
  const [documents, setDocuments] = useState<File[]>([])
  const [selectedHospital, setSelectedHospital] = useState("")
  const [referralType, setReferralType] = useState<"specific" | "general">("general")

  const [formData, setFormData] = useState({
    // Patient Information
    patientName: "",
    patientId: "",
    phoneNumber: "",
    whatsappNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Medical Information
    medicalCondition: "",
    department: "",
    urgency: "",
    reasonForReferral: "",
    clinicalSummary: "",
    currentTreatment: "",

    // Consent and Preferences
    medicalConsent: false,
    whatsappConsent: false,
    preferredDate: null as Date | null,

    // Additional Details
    allergies: "",
    medications: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setDocuments((prev) => [...prev, ...files])
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log("[v0] Submitting referral:", { formData, documents, selectedHospital, referralType })
    // In real app, this would submit to API
  }

  const isFormValid = () => {
    return (
      formData.patientName &&
      formData.patientId &&
      formData.phoneNumber &&
      formData.medicalCondition &&
      formData.department &&
      formData.urgency &&
      formData.reasonForReferral &&
      formData.medicalConsent &&
      formData.whatsappConsent
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-medical-blue" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Create Referral</h1>
                <p className="text-muted-foreground mt-1">Submit a new patient referral request</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={handleSubmit} disabled={!isFormValid()}>
                Submit Referral
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
            <CardDescription>Basic patient details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Full Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  placeholder="Enter patient's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange("patientId", e.target.value)}
                  placeholder="Hospital patient ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+254-700-123-456"
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <Phone className="w-4 h-4 text-trust-green" />
                  </div>
                  <Input
                    id="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                    placeholder="+254-700-123-456"
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Contact name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Patient's address"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Medical Information
            </CardTitle>
            <CardDescription>Medical condition and referral details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="department">Medical Department *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level *</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${level.color}`} />
                          <span>{level.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalCondition">Medical Condition *</Label>
              <Textarea
                id="medicalCondition"
                value={formData.medicalCondition}
                onChange={(e) => handleInputChange("medicalCondition", e.target.value)}
                placeholder="Describe the patient's medical condition"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonForReferral">Reason for Referral *</Label>
              <Textarea
                id="reasonForReferral"
                value={formData.reasonForReferral}
                onChange={(e) => handleInputChange("reasonForReferral", e.target.value)}
                placeholder="Why is this referral necessary?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinicalSummary">Clinical Summary</Label>
              <Textarea
                id="clinicalSummary"
                value={formData.clinicalSummary}
                onChange={(e) => handleInputChange("clinicalSummary", e.target.value)}
                placeholder="Brief clinical summary and relevant history"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="List any known allergies"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  placeholder="List current medications"
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Medical Documents
            </CardTitle>
            <CardDescription>Upload medical reports, X-rays, and other relevant documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Upload Medical Documents</p>
                <p className="text-xs text-muted-foreground">Drag and drop files here, or click to browse</p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, JPG, PNG, DICOM (Max 10MB per file)
                </p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.dicom"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {documents.length > 0 && (
              <div className="space-y-3">
                <Label>Uploaded Documents</Label>
                {documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hospital Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Hospital Selection
            </CardTitle>
            <CardDescription>Choose referral type and destination hospital</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Referral Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className={cn(
                    "cursor-pointer border-2 transition-colors",
                    referralType === "general" ? "border-medical-blue bg-medical-blue/5" : "border-muted",
                  )}
                  onClick={() => setReferralType("general")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2",
                          referralType === "general"
                            ? "border-medical-blue bg-medical-blue"
                            : "border-muted-foreground",
                        )}
                      />
                      <div>
                        <p className="font-medium">General Referral</p>
                        <p className="text-sm text-muted-foreground">System finds best available hospital</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "cursor-pointer border-2 transition-colors",
                    referralType === "specific" ? "border-medical-blue bg-medical-blue/5" : "border-muted",
                  )}
                  onClick={() => setReferralType("specific")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2",
                          referralType === "specific"
                            ? "border-medical-blue bg-medical-blue"
                            : "border-muted-foreground",
                        )}
                      />
                      <div>
                        <p className="font-medium">Specific Hospital</p>
                        <p className="text-sm text-muted-foreground">Choose a particular hospital</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {referralType === "specific" && (
              <div className="space-y-2">
                <Label htmlFor="hospital">Select Hospital</Label>
                <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="knh">Kenyatta National Hospital</SelectItem>
                    <SelectItem value="aku">Aga Khan University Hospital</SelectItem>
                    <SelectItem value="nairobi">Nairobi Hospital</SelectItem>
                    <SelectItem value="mater">Mater Misericordiae Hospital</SelectItem>
                    <SelectItem value="karen">Karen Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preferences and Consent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Preferences & Consent
            </CardTitle>
            <CardDescription>Patient preferences and required consent forms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Preferred Referral Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select preferred date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="medicalConsent"
                  checked={formData.medicalConsent}
                  onCheckedChange={(checked) => handleInputChange("medicalConsent", checked)}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="medicalConsent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Medical Information Consent *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Patient consents to sharing medical information with the receiving hospital for treatment purposes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="whatsappConsent"
                  checked={formData.whatsappConsent}
                  onCheckedChange={(checked) => handleInputChange("whatsappConsent", checked)}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="whatsappConsent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    WhatsApp Communication Consent *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Patient consents to receiving referral updates and appointment notifications via WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any additional information or special instructions"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Section */}
        <Card className="border-2 border-medical-blue/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Ready to Submit Referral?</h3>
                <p className="text-sm text-muted-foreground">
                  Please review all information before submitting. You'll receive a confirmation once processed.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="lg">
                  Save Draft
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className="bg-medical-blue hover:bg-medical-blue/90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Referral
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
