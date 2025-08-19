import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Trash, Search, Clock, Calendar, Globe } from 'lucide-react';

// Top time zones including Islamabad
const TOP_TIME_ZONES = [
  { id: 'Asia/Karachi', name: 'Islamabad', country: 'Pakistan' },
  { id: 'America/New_York', name: 'New York', country: 'USA' },
  { id: 'Europe/London', name: 'London', country: 'UK' },
  { id: 'Asia/Tokyo', name: 'Tokyo', country: 'Japan' },
  { id: 'Asia/Dubai', name: 'Dubai', country: 'UAE' },
  { id: 'Europe/Paris', name: 'Paris', country: 'France' }
];

// Extended list of time zones from around the world
const ALL_TIME_ZONES = [
  // Asia
  { id: 'Asia/Karachi', name: 'Islamabad', country: 'Pakistan' },
  { id: 'Asia/Kolkata', name: 'Mumbai', country: 'India' },
  { id: 'Asia/Dhaka', name: 'Dhaka', country: 'Bangladesh' },
  { id: 'Asia/Colombo', name: 'Colombo', country: 'Sri Lanka' },
  { id: 'Asia/Kathmandu', name: 'Kathmandu', country: 'Nepal' },
  { id: 'Asia/Almaty', name: 'Almaty', country: 'Kazakhstan' },
  { id: 'Asia/Tashkent', name: 'Tashkent', country: 'Uzbekistan' },
  { id: 'Asia/Baku', name: 'Baku', country: 'Azerbaijan' },
  { id: 'Asia/Yerevan', name: 'Yerevan', country: 'Armenia' },
  { id: 'Asia/Tbilisi', name: 'Tbilisi', country: 'Georgia' },
  { id: 'Asia/Jerusalem', name: 'Jerusalem', country: 'Israel' },
  { id: 'Asia/Beirut', name: 'Beirut', country: 'Lebanon' },
  { id: 'Asia/Amman', name: 'Amman', country: 'Jordan' },
  { id: 'Asia/Damascus', name: 'Damascus', country: 'Syria' },
  { id: 'Asia/Baghdad', name: 'Baghdad', country: 'Iraq' },
  { id: 'Asia/Kuwait', name: 'Kuwait City', country: 'Kuwait' },
  { id: 'Asia/Riyadh', name: 'Riyadh', country: 'Saudi Arabia' },
  { id: 'Asia/Qatar', name: 'Doha', country: 'Qatar' },
  { id: 'Asia/Bahrain', name: 'Manama', country: 'Bahrain' },
  { id: 'Asia/Muscat', name: 'Muscat', country: 'Oman' },
  { id: 'Asia/Aden', name: 'Aden', country: 'Yemen' },
  { id: 'Asia/Sanaa', name: 'Sanaa', country: 'Yemen' },
  
  // Europe
  { id: 'Europe/Moscow', name: 'Moscow', country: 'Russia' },
  { id: 'Europe/Berlin', name: 'Berlin', country: 'Germany' },
  { id: 'Europe/Rome', name: 'Rome', country: 'Italy' },
  { id: 'Europe/Madrid', name: 'Madrid', country: 'Spain' },
  { id: 'Europe/Amsterdam', name: 'Amsterdam', country: 'Netherlands' },
  { id: 'Europe/Brussels', name: 'Brussels', country: 'Belgium' },
  { id: 'Europe/Vienna', name: 'Vienna', country: 'Austria' },
  { id: 'Europe/Stockholm', name: 'Stockholm', country: 'Sweden' },
  { id: 'Europe/Oslo', name: 'Oslo', country: 'Norway' },
  { id: 'Europe/Copenhagen', name: 'Copenhagen', country: 'Denmark' },
  { id: 'Europe/Helsinki', name: 'Helsinki', country: 'Finland' },
  { id: 'Europe/Warsaw', name: 'Warsaw', country: 'Poland' },
  { id: 'Europe/Prague', name: 'Prague', country: 'Czech Republic' },
  { id: 'Europe/Budapest', name: 'Budapest', country: 'Hungary' },
  { id: 'Europe/Bucharest', name: 'Bucharest', country: 'Romania' },
  { id: 'Europe/Sofia', name: 'Sofia', country: 'Bulgaria' },
  { id: 'Europe/Athens', name: 'Athens', country: 'Greece' },
  { id: 'Europe/Istanbul', name: 'Istanbul', country: 'Turkey' },
  { id: 'Europe/Kiev', name: 'Kyiv', country: 'Ukraine' },
  { id: 'Europe/Minsk', name: 'Minsk', country: 'Belarus' },
  
  // Americas
  { id: 'America/Los_Angeles', name: 'Los Angeles', country: 'USA' },
  { id: 'America/Chicago', name: 'Chicago', country: 'USA' },
  { id: 'America/Denver', name: 'Denver', country: 'USA' },
  { id: 'America/Mexico_City', name: 'Mexico City', country: 'Mexico' },
  { id: 'America/Toronto', name: 'Toronto', country: 'Canada' },
  { id: 'America/Vancouver', name: 'Vancouver', country: 'Canada' },
  { id: 'America/Montreal', name: 'Montreal', country: 'Canada' },
  { id: 'America/Sao_Paulo', name: 'São Paulo', country: 'Brazil' },
  { id: 'America/Buenos_Aires', name: 'Buenos Aires', country: 'Argentina' },
  { id: 'America/Lima', name: 'Lima', country: 'Peru' },
  { id: 'America/Bogota', name: 'Bogota', country: 'Colombia' },
  { id: 'America/Caracas', name: 'Caracas', country: 'Venezuela' },
  { id: 'America/Santiago', name: 'Santiago', country: 'Chile' },
  { id: 'America/Montevideo', name: 'Montevideo', country: 'Uruguay' },
  { id: 'America/La_Paz', name: 'La Paz', country: 'Bolivia' },
  { id: 'America/Asuncion', name: 'Asuncion', country: 'Paraguay' },
  { id: 'America/Guatemala', name: 'Guatemala City', country: 'Guatemala' },
  { id: 'America/Tegucigalpa', name: 'Tegucigalpa', country: 'Honduras' },
  { id: 'America/San_Jose', name: 'San Jose', country: 'Costa Rica' },
  { id: 'America/Panama', name: 'Panama City', country: 'Panama' },
  
  // Africa
  { id: 'Africa/Cairo', name: 'Cairo', country: 'Egypt' },
  { id: 'Africa/Lagos', name: 'Lagos', country: 'Nigeria' },
  { id: 'Africa/Johannesburg', name: 'Johannesburg', country: 'South Africa' },
  { id: 'Africa/Nairobi', name: 'Nairobi', country: 'Kenya' },
  { id: 'Africa/Casablanca', name: 'Casablanca', country: 'Morocco' },
  { id: 'Africa/Algiers', name: 'Algiers', country: 'Algeria' },
  { id: 'Africa/Tunis', name: 'Tunis', country: 'Tunisia' },
  { id: 'Africa/Tripoli', name: 'Tripoli', country: 'Libya' },
  { id: 'Africa/Khartoum', name: 'Khartoum', country: 'Sudan' },
  { id: 'Africa/Addis_Ababa', name: 'Addis Ababa', country: 'Ethiopia' },
  { id: 'Africa/Dakar', name: 'Dakar', country: 'Senegal' },
  { id: 'Africa/Accra', name: 'Accra', country: 'Ghana' },
  { id: 'Africa/Abidjan', name: 'Abidjan', country: 'Ivory Coast' },
  { id: 'Africa/Douala', name: 'Douala', country: 'Cameroon' },
  { id: 'Africa/Lusaka', name: 'Lusaka', country: 'Zambia' },
  { id: 'Africa/Harare', name: 'Harare', country: 'Zimbabwe' },
  { id: 'Africa/Kigali', name: 'Kigali', country: 'Rwanda' },
  { id: 'Africa/Bujumbura', name: 'Bujumbura', country: 'Burundi' },
  { id: 'Africa/Maputo', name: 'Maputo', country: 'Mozambique' },
  { id: 'Africa/Lilongwe', name: 'Lilongwe', country: 'Malawi' },
  
  // Oceania
  { id: 'Australia/Sydney', name: 'Sydney', country: 'Australia' },
  { id: 'Australia/Melbourne', name: 'Melbourne', country: 'Australia' },
  { id: 'Australia/Brisbane', name: 'Brisbane', country: 'Australia' },
  { id: 'Australia/Perth', name: 'Perth', country: 'Australia' },
  { id: 'Australia/Adelaide', name: 'Adelaide', country: 'Australia' },
  { id: 'Pacific/Auckland', name: 'Auckland', country: 'New Zealand' },
  { id: 'Pacific/Fiji', name: 'Suva', country: 'Fiji' },
  { id: 'Pacific/Guam', name: 'Hagåtña', country: 'Guam' },
  { id: 'Pacific/Honolulu', name: 'Honolulu', country: 'USA' },
  { id: 'Pacific/Tahiti', name: 'Papeete', country: 'French Polynesia' },
  { id: 'Pacific/Port_Moresby', name: 'Port Moresby', country: 'Papua New Guinea' },
  { id: 'Pacific/Noumea', name: 'Noumea', country: 'New Caledonia' },
  { id: 'Pacific/Galapagos', name: 'Galapagos', country: 'Ecuador' },
  { id: 'Indian/Maldives', name: 'Malé', country: 'Maldives' },
  { id: 'Indian/Mauritius', name: 'Port Louis', country: 'Mauritius' },
  { id: 'Indian/Reunion', name: 'Saint-Denis', country: 'Réunion' },
  { id: 'Indian/Comoro', name: 'Moroni', country: 'Comoros' },
  { id: 'Indian/Antananarivo', name: 'Antananarivo', country: 'Madagascar' },
  { id: 'Indian/Mayotte', name: 'Mamoudzou', country: 'Mayotte' },
  { id: 'Atlantic/Cape_Verde', name: 'Praia', country: 'Cape Verde' }
];

interface TimeZoneData {
  id: string;
  name: string;
  country: string;
  time: string;
  date: string;
  offset: string;
}

export default function WorldTimeZoneDashboard() {
  const [timeZones, setTimeZones] = useState<TimeZoneData[]>([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(true);
  const [showSeconds, setShowSeconds] = useState<boolean>(true);
  const [showDate, setShowDate] = useState<boolean>(true);

  // Initialize with top time zones
  useEffect(() => {
    const initialTimeZones = TOP_TIME_ZONES.map(zone => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: zone.id,
        hour: is24HourFormat ? '2-digit' : 'numeric',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: !is24HourFormat
      });
      
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: zone.id,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const offsetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: zone.id,
        timeZoneName: 'longOffset'
      });

      return {
        id: zone.id,
        name: zone.name,
        country: zone.country,
        time: formatter.format(now),
        date: dateFormatter.format(now),
        offset: offsetFormatter.formatToParts(now).find(part => part.type === 'timeZoneName')?.value || ''
      };
    });

    setTimeZones(initialTimeZones);
  }, [is24HourFormat, showSeconds]);

  // Update times every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeZones(prev => prev.map(zone => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: zone.id,
          hour: is24HourFormat ? '2-digit' : 'numeric',
          minute: '2-digit',
          second: showSeconds ? '2-digit' : undefined,
          hour12: !is24HourFormat
        });
        
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: zone.id,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        const offsetFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: zone.id,
          timeZoneName: 'longOffset'
        });

        return {
          ...zone,
          time: formatter.format(now),
          date: showDate ? dateFormatter.format(now) : '',
          offset: offsetFormatter.formatToParts(now).find(part => part.type === 'timeZoneName')?.value || ''
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [is24HourFormat, showSeconds, showDate]);

  const handleAddTimeZone = () => {
    if (!selectedTimeZone || timeZones.some(tz => tz.id === selectedTimeZone)) return;

    const zoneInfo = ALL_TIME_ZONES.find(tz => tz.id === selectedTimeZone);
    if (!zoneInfo) return;

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedTimeZone,
      hour: is24HourFormat ? '2-digit' : 'numeric',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12: !is24HourFormat
    });
    
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedTimeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const offsetFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedTimeZone,
      timeZoneName: 'longOffset'
    });

    const newTimeZone: TimeZoneData = {
      id: selectedTimeZone,
      name: zoneInfo.name,
      country: zoneInfo.country,
      time: formatter.format(now),
      date: showDate ? dateFormatter.format(now) : '',
      offset: offsetFormatter.formatToParts(now).find(part => part.type === 'timeZoneName')?.value || ''
    };

    setTimeZones(prev => [...prev, newTimeZone]);
    setSelectedTimeZone('');
  };

  const handleRemoveTimeZone = (id: string) => {
    setTimeZones(prev => prev.filter(tz => tz.id !== id));
  };

  const filteredTimeZones = timeZones.filter(tz => 
    tz.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tz.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableTimeZones = ALL_TIME_ZONES.filter(zone => 
    !timeZones.some(tz => tz.id === zone.id) &&
    (zone.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     zone.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">World Time Zone Dashboard</h1>
          </div>
          <p className="text-gray-600">Current times from around the globe with Islamabad, Pakistan included</p>
        </header>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Time Zone Controls</span>
              </div>
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="time-format" className="text-nowrap">24-Hour</Label>
                  <Button 
                    variant={is24HourFormat ? "default" : "outline"} 
                    onClick={() => setIs24HourFormat(!is24HourFormat)}
                    size="sm"
                  >
                    {is24HourFormat ? "ON" : "OFF"}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="show-seconds" className="text-nowrap">Seconds</Label>
                  <Button 
                    variant={showSeconds ? "default" : "outline"} 
                    onClick={() => setShowSeconds(!showSeconds)}
                    size="sm"
                  >
                    {showSeconds ? "ON" : "OFF"}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="show-date" className="text-nowrap">Date</Label>
                  <Button 
                    variant={showDate ? "default" : "outline"} 
                    onClick={() => setShowDate(!showDate)}
                    size="sm"
                  >
                    {showDate ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search time zones (e.g. Islamabad, Pakistan)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedTimeZone} onValueChange={setSelectedTimeZone}>
                  <SelectTrigger className="w-full sm:w-[300px]">
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeZones.map(zone => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name}, {zone.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddTimeZone} disabled={!selectedTimeZone}>
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredTimeZones.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No time zones found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or add a new time zone.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTimeZones.map((timeZone) => (
              <Card 
                key={timeZone.id} 
                className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {timeZone.name}
                        <span className="text-xs font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {timeZone.country}
                        </span>
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">{timeZone.offset}</p>
                    </div>
                    {!TOP_TIME_ZONES.some(tz => tz.id === timeZone.id) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTimeZone(timeZone.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-center py-3">
                    {timeZone.time}
                  </div>
                  {showDate && (
                    <div className="text-center text-gray-600 text-sm">
                      {timeZone.date}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Displaying {filteredTimeZones.length} of {timeZones.length} time zones</p>
          <p className="mt-1">Includes Islamabad, Pakistan and time zones from all continents</p>
        </div>
      </div>
    </div>
  );
}