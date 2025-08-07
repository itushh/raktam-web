import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";
import { Checkbox } from "../components/ui/checkbox.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getApiEndpoint } from "../config/env.js";
import { Calendar } from "../components/ui/calendar.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover.jsx";
import { ChevronDownIcon } from "lucide-react";

export function BecomeDonor() {
  const [formData, setFormData] = useState({
    dateOfBirth: null,
    bloodGroup: '',
    mobileNumber: '',
    address: '',
    donatedBefore: false,
    dateDonated: null,
    willingToDonateInEmergency: false,
    willingToBeCalledForCamps: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDobPickerOpen, setIsDobPickerOpen] = useState(false);
  const [isDonatedDatePickerOpen, setIsDonatedDatePickerOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if not logged in
  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    checkExistingDonor();
  }, []);

  const checkExistingDonor = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(getApiEndpoint('/api/donor/profile'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          dateOfBirth: data.donor.dateOfBirth ? new Date(data.donor.dateOfBirth) : null,
          bloodGroup: data.donor.bloodGroup || '',
          mobileNumber: data.donor.mobileNumber || '',
          address: data.donor.address || '',
          donatedBefore: data.donor.donatedBefore || false,
          dateDonated: data.donor.dateDonated ? new Date(data.donor.dateDonated) : null,
          willingToDonateInEmergency: data.donor.willingToDonateInEmergency || false,
          willingToBeCalledForCamps: data.donor.willingToBeCalledForCamps || false
        });
        setIsEditMode(true);
      }
    } catch (error) {
      console.error('Error checking donor profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleCheckboxChange = (id, checked) => {
    setFormData(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleDateChange = (id, date) => {
    setFormData(prev => ({
      ...prev,
      [id]: date
    }));
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user makes selection
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 65) {
        newErrors.dateOfBirth = 'You must be between 18 and 65 years old to donate blood';
      }
    }

    // Blood group validation
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }

    // Mobile number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters long';
    }

    // Date donated validation (if donated before)
    if (formData.donatedBefore && !formData.dateDonated) {
      newErrors.dateDonated = 'Date donated is required if you have donated before';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const endpoint = isEditMode ? '/api/donor/profile' : '/api/donor/register';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(getApiEndpoint(endpoint), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          dateDonated: formData.donatedBefore ? formData.dateDonated : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form after successful submission
        setFormData({
          dateOfBirth: null,
          bloodGroup: '',
          mobileNumber: '',
          address: '',
          donatedBefore: false,
          dateDonated: null,
          willingToDonateInEmergency: false,
          willingToBeCalledForCamps: false
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ general: data.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Donor registration error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            {isEditMode ? 'Update Donor Profile' : 'Become a Donor'}
          </CardTitle>
          <CardDescription>
            {isEditMode 
              ? 'Update your donor information to help save more lives.'
              : 'Join our community of heroes and save lives with your donation.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {errors.general && (
              <div className="text-sm text-red-500 text-center">
                {errors.general}
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Popover open={isDobPickerOpen} onOpenChange={setIsDobPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="dateOfBirth"
                    className={`w-full justify-between font-normal ${errors.dateOfBirth ? "border-red-500" : ""}`}
                  >
                    {formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      handleDateChange('dateOfBirth', date);
                      setIsDobPickerOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => handleSelectChange('bloodGroup', value)}>
                <SelectTrigger className={`w-full ${errors.bloodGroup ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              {errors.bloodGroup && (
                <p className="text-sm text-red-500">{errors.bloodGroup}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className={errors.mobileNumber ? "border-red-500" : ""}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-500">{errors.mobileNumber}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="donatedBefore"
                checked={formData.donatedBefore}
                onCheckedChange={(checked) => handleCheckboxChange('donatedBefore', checked)}
              />
              <Label htmlFor="donatedBefore">Have you donated blood before?</Label>
            </div>

            {formData.donatedBefore && (
              <div className="grid gap-2">
                <Label htmlFor="dateDonated">Date of Last Donation</Label>
                <Popover open={isDonatedDatePickerOpen} onOpenChange={setIsDonatedDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="dateDonated"
                      className={`w-full justify-between font-normal ${errors.dateDonated ? "border-red-500" : ""}`}
                    >
                      {formData.dateDonated ? formData.dateDonated.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dateDonated}
                      onSelect={(date) => {
                        handleDateChange('dateDonated', date);
                        setIsDonatedDatePickerOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateDonated && (
                  <p className="text-sm text-red-500">{errors.dateDonated}</p>
                )}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="willingToDonateInEmergency"
                checked={formData.willingToDonateInEmergency}
                onCheckedChange={(checked) => handleCheckboxChange('willingToDonateInEmergency', checked)}
              />
              <Label htmlFor="willingToDonateInEmergency">Willing to donate in emergency situations?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="willingToBeCalledForCamps"
                checked={formData.willingToBeCalledForCamps}
                onCheckedChange={(checked) => handleCheckboxChange('willingToBeCalledForCamps', checked)}
              />
              <Label htmlFor="willingToBeCalledForCamps">Would you like to be called for donation camps?</Label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting 
                ? (isEditMode ? "Updating..." : "Registering...") 
                : (isEditMode ? "Update Profile" : "Become a Donor")
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
 