"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building2, MapPin, Phone, Mail, Globe, Users, Stethoscope, Plus, Trash2, Save, Edit } from "lucide-react"

// Mock data - in real app this would come from API
const hospitalProfile = {
  id: "hosp-001",
  name: "Nairobi General Hospital",
  type: "hospital",
  address: "123 Medical Center Drive",
  city: "Nairobi",
  state: "Nairobi County",
  postalCode: "00100",
  country: "Kenya",
  phone: "+254-20-1234567",
  email: "info@nairobigeneral.co.ke",
  website: "https://nairobigeneral.co.ke",
  emergencyContact: "+254-20-1234999",
  licenseNumber: "HL-2024-001",
  accreditation: "Kenya Medical Board Certified",
  totalCapacity: 350,
  currentCapacity: 220,
  latitude: -1.2921,
  longitude: 36.7902,
}

const availableDepartments = [
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

const hospitalDepartments = [
  {
    id: "dept-001",
    name: "Emergency Medicine",
    capacity: 50,
    currentLoad: 35,
    headOfDepartment: "Dr. Sarah Johnson",
    contactPhone: "+254-20-1234501",
    contactEmail: "emergency@nairobigeneral.co.ke",
  },
  {
    id: "dept-002",
    name: "Cardiology",
    capacity: 30,
    currentLoad: 22,
    headOfDepartment: "Dr. Michael Chen",
    contactPhone: "+254-20-1234502",
    contactEmail: "cardiology@nairobigeneral.co.ke",
  },
  {
    id: "dept-003",
    name: "Pediatrics",
    capacity: 40,
    currentLoad: 28,
    headOfDepartment: "Dr. Emily Rodriguez",
    contactPhone: "+254-20-1234503",
    contactEmail: "pediatrics@nairobigeneral.co.ke",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(hospitalProfile)
  const [departments, setDepartments] = useState(hospitalDepartments)
  const [newDepartment, setNewDepartment] = useState("")

  const handleSave = () => {
    // In real app, this would save to API
    setIsEditing(false)
    console.log("[v0] Saving profile:", profile)
  }

  const addDepartment = () => {
    if (newDepartment && !departments.find((d) => d.name === newDepartment)) {
      const newDept = {
        id: `dept-${Date.now()}`,
        name: newDepartment,
        capacity: 0,
        currentLoad: 0,
        headOfDepartment: "",
        contactPhone: "",
        contactEmail: "",
      }
      setDepartments([...departments, newDept])
      setNewDepartment("")
    }
  }

  const removeDepartment = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id))
  }

  const updateDepartment = (id: string, field: string, value: string | number) => {
    setDepartments(departments.map((d) => (d.id === id ? { ...d, [field]: value } : d)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-medical-blue" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Hospital Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your hospital information and departments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General Info</TabsTrigger>
            <TabsTrigger value="location">Location & Contact</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="capacity">Capacity Management</TabsTrigger>
          </TabsList>

          {/* General Information */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Hospital Information
                </CardTitle>
                <CardDescription>Basic information about your healthcare facility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Hospital Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Facility Type</Label>
                    <Select
                      value={profile.type}
                      onValueChange={(value) => setProfile({ ...profile, type: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="clinic">Clinic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={profile.licenseNumber}
                      onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accreditation">Accreditation</Label>
                    <Input
                      id="accreditation"
                      value={profile.accreditation}
                      onChange={(e) => setProfile({ ...profile, accreditation: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location & Contact */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Information
                </CardTitle>
                <CardDescription>Physical address and geographic coordinates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/County</Label>
                    <Input
                      id="state"
                      value={profile.state}
                      onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input
                      id="postal"
                      value={profile.postalCode}
                      onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={profile.latitude}
                      onChange={(e) => setProfile({ ...profile, latitude: Number.parseFloat(e.target.value) })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={profile.longitude}
                      onChange={(e) => setProfile({ ...profile, longitude: Number.parseFloat(e.target.value) })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>Phone numbers and email addresses for communication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Main Phone</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Phone className="w-4 h-4 text-urgent-red" />
                      </div>
                      <Input
                        id="emergency"
                        value={profile.emergencyContact}
                        onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Medical Departments
                </CardTitle>
                <CardDescription>Manage the medical specialties available at your facility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Department */}
                <div className="flex gap-3">
                  <Select value={newDepartment} onValueChange={setNewDepartment}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select department to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDepartments
                        .filter((dept) => !departments.find((d) => d.name === dept))
                        .map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addDepartment} disabled={!newDepartment}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Department
                  </Button>
                </div>

                <Separator />

                {/* Department List */}
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <Card key={dept.id} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{dept.name}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDepartment(dept.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Capacity</Label>
                            <Input
                              type="number"
                              value={dept.capacity}
                              onChange={(e) =>
                                updateDepartment(dept.id, "capacity", Number.parseInt(e.target.value) || 0)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Current Load</Label>
                            <Input
                              type="number"
                              value={dept.currentLoad}
                              onChange={(e) =>
                                updateDepartment(dept.id, "currentLoad", Number.parseInt(e.target.value) || 0)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Head of Department</Label>
                          <Input
                            value={dept.headOfDepartment}
                            onChange={(e) => updateDepartment(dept.id, "headOfDepartment", e.target.value)}
                            disabled={!isEditing}
                            placeholder="Dr. Name"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Contact Phone</Label>
                            <Input
                              value={dept.contactPhone}
                              onChange={(e) => updateDepartment(dept.id, "contactPhone", e.target.value)}
                              disabled={!isEditing}
                              placeholder="+254-20-1234567"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Contact Email</Label>
                            <Input
                              type="email"
                              value={dept.contactEmail}
                              onChange={(e) => updateDepartment(dept.id, "contactEmail", e.target.value)}
                              disabled={!isEditing}
                              placeholder="department@hospital.com"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Capacity Management */}
          <TabsContent value="capacity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Hospital Capacity
                </CardTitle>
                <CardDescription>Manage overall hospital capacity and bed availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="totalCapacity">Total Capacity</Label>
                    <Input
                      id="totalCapacity"
                      type="number"
                      value={profile.totalCapacity}
                      onChange={(e) => setProfile({ ...profile, totalCapacity: Number.parseInt(e.target.value) || 0 })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCapacity">Current Occupancy</Label>
                    <Input
                      id="currentCapacity"
                      type="number"
                      value={profile.currentCapacity}
                      onChange={(e) =>
                        setProfile({ ...profile, currentCapacity: Number.parseInt(e.target.value) || 0 })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Capacity Overview</h3>
                    <Badge
                      variant={
                        (profile.currentCapacity / profile.totalCapacity) * 100 > 80
                          ? "destructive"
                          : (profile.currentCapacity / profile.totalCapacity) * 100 > 60
                            ? "secondary"
                            : "default"
                      }
                      className="text-sm"
                    >
                      {Math.round((profile.currentCapacity / profile.totalCapacity) * 100)}% Occupied
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Available Beds</span>
                      <span className="font-medium text-trust-green">
                        {profile.totalCapacity - profile.currentCapacity}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Occupied Beds</span>
                      <span className="font-medium text-warning-amber">{profile.currentCapacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Capacity</span>
                      <span className="font-medium">{profile.totalCapacity}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Department Capacity Summary</h3>
                  <div className="grid gap-4">
                    {departments.map((dept) => (
                      <div key={dept.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{dept.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {dept.headOfDepartment || "No head assigned"}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm font-medium">
                            {dept.currentLoad}/{dept.capacity}
                          </div>
                          <Badge
                            variant={
                              dept.capacity > 0 && (dept.currentLoad / dept.capacity) * 100 > 80
                                ? "destructive"
                                : dept.capacity > 0 && (dept.currentLoad / dept.capacity) * 100 > 60
                                  ? "secondary"
                                  : "default"
                            }
                            className="text-xs"
                          >
                            {dept.capacity > 0 ? Math.round((dept.currentLoad / dept.capacity) * 100) : 0}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
