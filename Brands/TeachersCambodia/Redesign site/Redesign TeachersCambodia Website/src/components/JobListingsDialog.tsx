import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, Briefcase, DollarSign, Users, MapPin, ArrowRight, Building2, CalendarClock, ExternalLink } from 'lucide-react';
import { ResumeUploadDialog } from './ResumeUploadDialog';

interface Job {
  id: string;
  position: string;
  company: string;
  companyUrl?: string;
  description: string;
  numberOfPositions: number;
  salaryRange: string;
  nationality: string;
  status: 'Open' | 'Urgent' | 'Closing Soon';
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  country: string;
  closingDate: string;
  benefits?: string;
  remark?: string;
}

interface JobListingsDialogProps {
  destination: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const middleEastJobs: Job[] = [
  {
    id: 'kw-1',
    position: 'Assistant Restaurant Manager (ARM)',
    company: 'Gastronomica ME',
    companyUrl: 'https://gastronomica-me.com/',
    description: 'Job Description for ARM - Lead restaurant operations, supervise staff, ensure excellent service standards, and support daily management activities.',
    numberOfPositions: 1,
    salaryRange: '€1,400 - €2,200',
    nationality: 'Western Expats, South American, Eastern Europe',
    status: 'Open',
    category: 'Hospitality - Management',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'All inclusive. If company accommodation is required, €490 will be deducted as an allowance.'
  },
  {
    id: 'kw-2',
    position: 'European Pastry Chef',
    company: 'Pisces Kuwait',
    companyUrl: 'https://pisces-kw.com/',
    description: 'Prepare and bake European pastries, breads, cakes, and desserts. Decorate and present desserts with creativity and precision. Maintain quality, consistency, and hygiene standards. Manage ingredients, inventory, and kitchen organization. Supervise junior pastry staff and assist in training. Collaborate with kitchen team to develop new recipes and seasonal items.',
    numberOfPositions: 1,
    salaryRange: '€3,000 (Negotiable)',
    nationality: 'European',
    status: 'Open',
    category: 'Hospitality - Culinary',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-3',
    position: 'General Manager',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Oversee daily operations of the business or department. Develop and implement strategies to achieve business goals. Manage budgets, resources, and team performance. Ensure high standards of customer service and operational efficiency. Coordinate between departments and report to senior management.',
    numberOfPositions: 1,
    salaryRange: 'Negotiable',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Management',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025'
  },
  {
    id: 'kw-4',
    position: 'Assistant Restaurant Manager',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Assist in daily restaurant operations and ensure smooth service. Supervise staff, manage schedules, and provide training. Handle customer queries, complaints, and ensure high service standards. Support inventory management and cost control. Coordinate with the Restaurant Manager to implement policies and improve efficiency.',
    numberOfPositions: 1,
    salaryRange: '€3,000',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Management',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-5',
    position: 'Floor Manager',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Supervise daily floor operations and ensure smooth service. Manage and coordinate staff, including assigning duties and monitoring performance. Ensure excellent customer service and handle guest issues. Maintain cleanliness, safety, and operational standards on the floor.',
    numberOfPositions: 2,
    salaryRange: '€2,700',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Management',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-6',
    position: 'Hostess',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Greet and welcome guests upon arrival. Manage reservations, seating, and guest flow. Provide information about the menu and assist with customer inquiries. Ensure a pleasant and organized dining experience.',
    numberOfPositions: 15,
    salaryRange: '€2,400',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Front of House',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-7',
    position: 'Head Waitress/Waiter',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Greet and welcome guests upon arrival. Manage reservations, seating, and guest flow. Provide information about the menu and assist with customer inquiries. Ensure a pleasant and organized dining experience.',
    numberOfPositions: 10,
    salaryRange: '€2,400',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Front of House',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-8',
    position: 'Waitress/Waiter',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Take and serve food and beverage orders accurately. Provide excellent customer service and attend to guest needs. Maintain cleanliness and organization of tables and service areas. Assist in setting up and clearing tables as required.',
    numberOfPositions: 10,
    salaryRange: '€1,900',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Front of House',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-9',
    position: 'Pizza Chef',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Prepare and cook pizzas according to menu and recipes. Ensure high quality, taste, and presentation of pizzas. Maintain cleanliness and organization of the kitchen station. Manage inventory of ingredients and assist in stock control.',
    numberOfPositions: 2,
    salaryRange: '€2,500',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Culinary',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-10',
    position: 'Chef De Partie',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Prepare and cook Italian dishes according to menu and recipes. Ensure quality, consistency, and presentation of all dishes. Maintain cleanliness and organization of the kitchen station. Assist in inventory management and proper storage of ingredients.',
    numberOfPositions: 2,
    salaryRange: '€2,000',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Culinary',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025'
  },
  {
    id: 'kw-11',
    position: 'Sous Chef',
    company: 'Nejoud Restaurant Management Company',
    companyUrl: 'https://www.nejoud.com/',
    description: 'Assist the Head Chef in managing kitchen operations and Italian cuisine preparation. Supervise and train junior kitchen staff. Ensure quality, consistency, and presentation of all dishes. Maintain hygiene, kitchen organization, and inventory control.',
    numberOfPositions: 1,
    salaryRange: '€2,500',
    nationality: 'Italian',
    status: 'Open',
    category: 'Hospitality - Culinary',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'Food + Accommodation + Transportation + Air Ticket'
  },
  {
    id: 'kw-12',
    position: 'Hostess',
    company: 'Gastronomica ME',
    companyUrl: 'https://gastronomica-me.com/',
    description: 'Age below 21-27. Greet and welcome guests warmly upon arrival. Escort guests to their tables and present menus. Manage reservations and seating arrangements. Provide information about the restaurant and promotions. Coordinate with servers to ensure smooth service. Handle guest inquiries and assist with special requests. Maintain cleanliness and order in the reception/entrance area.',
    numberOfPositions: 2,
    salaryRange: '€1,120.80',
    nationality: 'South Africa, Eastern Europe (Serbia, Montenegro, Belarus), South American',
    status: 'Open',
    category: 'Hospitality - Front of House',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'All inclusive'
  },
  {
    id: 'kw-13',
    position: 'Server - Male/Female',
    company: 'Gastronomica ME',
    companyUrl: 'https://gastronomica-me.com/',
    description: 'Age below 21-27. Greet and welcome guests warmly upon arrival. Escort guests to their tables and present menus. Manage reservations and seating arrangements. Provide information about the restaurant and promotions. Coordinate with servers to ensure smooth service. Handle guest inquiries and assist with special requests. Maintain cleanliness and order in the reception/entrance area.',
    numberOfPositions: 8,
    salaryRange: '€980.70',
    nationality: 'South Africa, Eastern Europe (Serbia, Montenegro, Belarus), South American',
    status: 'Open',
    category: 'Hospitality - Front of House',
    priority: 'High',
    country: 'Kuwait',
    closingDate: '15/10/2025',
    benefits: 'All inclusive'
  },
  {
    id: 'dubai-1',
    position: 'Entry Level Positions - Male/Female',
    company: 'Raffles Dubai',
    description: 'Various entry-level opportunities in the luxury hospitality sector. Salary details to be discussed during interview process.',
    numberOfPositions: 1,
    salaryRange: 'To Be Discussed',
    nationality: 'All Nationalities',
    status: 'Open',
    category: 'Hospitality - Entry Level',
    priority: 'High',
    country: 'Dubai',
    closingDate: '15/10/2025'
  }
];

const europeanJobs: Job[] = [
  // Netherlands - Scaffolding Positions
  {
    id: 'nl-1',
    position: 'Scaffolders Helper (CAO Bouw)',
    company: 'Construction Sector',
    description: 'Job Description for Scaffholder Helper in Bouw. Assist in assembling and dismantling scaffolding structures on construction sites. Support experienced scaffolders with materials and tools.',
    numberOfPositions: 5,
    salaryRange: '€2,338 - €2,511 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Scaffolding',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  {
    id: 'nl-2',
    position: 'Scaffolders Builder (CAO Bouw)',
    company: 'Construction Sector',
    description: 'Job Description for Scaffholder Builder in Bouw. Build and erect scaffolding structures according to safety regulations and construction requirements.',
    numberOfPositions: 5,
    salaryRange: '€2,511 - €2,683 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Scaffolding',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  {
    id: 'nl-3',
    position: 'Scaffolders First Level Builder (CAO Bouw)',
    company: 'Construction Sector',
    description: 'Job Description for Scaffholder First Level Builder in Bouw. Senior scaffolding position with advanced building responsibilities and team supervision.',
    numberOfPositions: 5,
    salaryRange: '€2,683 - €2,944 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Scaffolding',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  {
    id: 'nl-4',
    position: 'Scaffolders Helper (CAO Metal)',
    company: 'Metal Sector',
    description: 'Job Description for Scaffholder Helper in Metal. Support scaffolding operations in metal industry projects and industrial environments.',
    numberOfPositions: 5,
    salaryRange: '€2,273 - €2,382 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Scaffolding',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  {
    id: 'nl-5',
    position: 'Scaffolders Builder (CAO Metal)',
    company: 'Metal Sector',
    description: 'Job Description for Scaffholders Builder in Metal. Construct scaffolding for metal industry projects with specialized requirements.',
    numberOfPositions: 5,
    salaryRange: '€2,468 - €2,598 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Scaffolding',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  {
    id: 'nl-6',
    position: 'Scaffolders First Level Builder (CAO Metal)',
    company: 'Metal Sector',
    description: 'Job Description for Scaffholders First Level Builder in Metal. Advanced scaffolding role in metal industry with leadership responsibilities.',
    numberOfPositions: 5,
    salaryRange: '€2,598 - €2,771 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Scaffolding',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  // Netherlands - Insulation Positions
  {
    id: 'nl-7',
    position: 'Helper - Insulation',
    company: 'Construction Sector',
    description: 'Job Description for Helpers Insulation. Assist insulation fitters with material preparation and installation support.',
    numberOfPositions: 5,
    salaryRange: '€2,274 - €2,382 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Insulation',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  {
    id: 'nl-8',
    position: 'Insulation Fitters',
    company: 'Construction Sector',
    description: 'Job Description for Insulation Fitters. Install thermal and acoustic insulation in buildings and industrial facilities.',
    numberOfPositions: 5,
    salaryRange: '€2,382 - €2,598 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Insulation',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  {
    id: 'nl-9',
    position: 'All-around Insulation Fitter',
    company: 'Construction Sector',
    description: 'Job Description for All-around Insulation Fitter. Expert-level insulation work across various materials and applications.',
    numberOfPositions: 5,
    salaryRange: '€2,598 - €2,771 Net',
    nationality: 'EU Nationalities',
    status: 'Open',
    category: 'Construction - Insulation',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'SNF-certified housing provided (one person per room, fully equipped with internet, furnishings, and utilities) + Holiday Savings €40/week'
  },
  // Netherlands - Transportation & Other
  {
    id: 'nl-10',
    position: 'Bus Driver',
    company: 'Transportation Company',
    description: 'Job Description for Bus Driver. Operate passenger buses on scheduled routes, ensure passenger safety, and maintain vehicle standards.',
    numberOfPositions: 999,
    salaryRange: '€2,600 - €3,000 Gross',
    nationality: 'EU ID or EU Passport',
    status: 'Open',
    category: 'Transportation',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'Individual rooms in shared apartments (max. 4 housemates) from €0 to €112/week. Optional car rental: €75/week. Health insurance: €35.58/week. Up to €200 travel cost compensation',
    remark: 'Always Open'
  },
  {
    id: 'nl-11',
    position: 'Truck Driver',
    company: 'Logistics Company',
    description: 'Job Description for Truck Driver. Drive commercial trucks for freight delivery, maintain logs, and ensure safe transport of goods.',
    numberOfPositions: 5,
    salaryRange: '€2,600 - €3,000 Gross',
    nationality: 'EU ID or Passport',
    status: 'Open',
    category: 'Transportation',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'Individual rooms in shared apartments (max. 4 housemates) from €0 to €112/week. Optional car rental: €75/week. Health insurance: €35.58/week. Up to €200 travel cost compensation'
  },
  {
    id: 'nl-12',
    position: 'Concrete Carpenters',
    company: 'Construction Company',
    description: 'Job Description for Concrete Carpenters. Build formwork for concrete structures, ensure proper alignment and support.',
    numberOfPositions: 2,
    salaryRange: '€2,900 Net',
    nationality: 'EU Citizens',
    status: 'Open',
    category: 'Construction - Carpentry',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  {
    id: 'nl-13',
    position: 'Welders',
    company: 'Manufacturing Company',
    description: 'Job Description for Welders. Perform welding operations on metal structures, ensure quality and safety standards.',
    numberOfPositions: 3,
    salaryRange: '€620 Net per week',
    nationality: 'EU Citizens',
    status: 'Open',
    category: 'Skilled Trades - Welding',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  {
    id: 'nl-14',
    position: 'Carpenters',
    company: 'Construction Company',
    description: 'Job Description for Carpenters. Construct, install, and repair wooden structures and fixtures in buildings.',
    numberOfPositions: 2,
    salaryRange: '€3,000 Net',
    nationality: 'EU Citizens',
    status: 'Open',
    category: 'Construction - Carpentry',
    priority: 'High',
    country: 'Netherlands',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  // Germany
  {
    id: 'de-1',
    position: 'Freight Handler',
    company: 'Logistics Company',
    description: 'Job Description for Freight Handler. Load, unload, and sort freight packages. Operate handling equipment and maintain warehouse organization.',
    numberOfPositions: 10,
    salaryRange: '€2,000 - €2,400 Net',
    nationality: 'EU Citizen/individuals with valid German work visa',
    status: 'Open',
    category: 'Logistics',
    priority: 'High',
    country: 'Germany',
    closingDate: '08/10/2025',
    benefits: 'Accommodation in double rooms (€600/month per person). Employer-provided public transport ticket or airport parking'
  },
  // Sweden
  {
    id: 'se-1',
    position: 'Chef',
    company: 'Hotel & Restaurant',
    description: 'Job Description for Chef. Prepare high-quality meals, manage kitchen operations, maintain food safety standards, and lead kitchen team.',
    numberOfPositions: 1,
    salaryRange: '€3,600 Gross',
    nationality: 'Self Employed EU Nationals',
    status: 'Open',
    category: 'Hospitality - Culinary',
    priority: 'High',
    country: 'Sweden',
    closingDate: '08/10/2025',
    benefits: 'Free accommodation 2km from hotel. Individual bedroom with access to fully equipped kitchen, bathroom, and internet'
  },
  {
    id: 'se-2',
    position: 'Gas Burner Metal Worker',
    company: 'Manufacturing Company',
    description: 'Job Description for Metal Worker. Perform gas burning and cutting operations on metal materials. Maintain equipment and safety standards.',
    numberOfPositions: 1,
    salaryRange: '€3,000 Gross',
    nationality: 'Self Employed EU Nationals',
    status: 'Open',
    category: 'Skilled Trades - Metalwork',
    priority: 'High',
    country: 'Sweden',
    closingDate: '08/10/2025',
    benefits: '1-bedroom apartment (not shared) with kitchen and bathroom. Located 1-2km from workplace (transport self-arranged)'
  },
  {
    id: 'se-3',
    position: 'Car Painter',
    company: 'Automotive Shop',
    description: 'Job Description for Car Painter. Prepare and paint vehicle surfaces, mix colors, ensure quality finish and proper curing.',
    numberOfPositions: 1,
    salaryRange: '€3,360+ Gross',
    nationality: 'Self Employed EU Nationals',
    status: 'Open',
    category: 'Skilled Trades - Automotive',
    priority: 'High',
    country: 'Sweden',
    closingDate: '08/10/2025',
    benefits: 'House with shared kitchen and bathroom. Private room provided'
  },
  {
    id: 'se-4',
    position: 'Pig Farmer',
    company: 'Agricultural Farm',
    description: 'Job Description for Pig Farmer. Care for pigs, manage feeding schedules, maintain farm facilities, and ensure animal welfare.',
    numberOfPositions: 4,
    salaryRange: '€2,640',
    nationality: 'Self Employed EU Nationals',
    status: 'Open',
    category: 'Agriculture',
    priority: 'High',
    country: 'Sweden',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  // Austria
  {
    id: 'at-1',
    position: 'Electricians',
    company: 'Construction & Electrical Services',
    description: 'Job Description for Electricians. Install, maintain, and repair electrical systems in residential and commercial buildings.',
    numberOfPositions: 3,
    salaryRange: '€3,060 - €3,500 Net',
    nationality: 'EU Citizens',
    status: 'Open',
    category: 'Skilled Trades - Electrical',
    priority: 'High',
    country: 'Austria',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  // Belgium
  {
    id: 'be-1',
    position: 'Body Shop Worker',
    company: 'Automotive Repair',
    description: 'Job Description for Body shop worker. Repair vehicle bodywork, perform dent removal, panel replacement, and surface preparation.',
    numberOfPositions: 30,
    salaryRange: '€4,325 Net',
    nationality: 'TCN with Work Permit / EU Nationals',
    status: 'Open',
    category: 'Skilled Trades - Automotive',
    priority: 'High',
    country: 'Belgium',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  {
    id: 'be-2',
    position: 'Mechanic',
    company: 'Automotive Service',
    description: 'Job Description for Mechanic. Diagnose and repair vehicle mechanical issues, perform maintenance, and ensure quality service.',
    numberOfPositions: 20,
    salaryRange: '€3,740 Net',
    nationality: 'TCN with Work Permit / EU Nationals',
    status: 'Open',
    category: 'Skilled Trades - Automotive',
    priority: 'High',
    country: 'Belgium',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  {
    id: 'be-3',
    position: 'Installer Interior Doors and Stairs',
    company: 'Construction Company',
    description: 'Job Description for Installer interior doors and stairs. Install interior doors, staircases, and related carpentry work in buildings.',
    numberOfPositions: 2,
    salaryRange: '€3,060 Net',
    nationality: 'TCN with Work Permit / EU Nationals',
    status: 'Open',
    category: 'Construction - Carpentry',
    priority: 'High',
    country: 'Belgium',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  {
    id: 'be-4',
    position: 'Fitter of Aluminium Exterior Carpentry',
    company: 'Construction Company',
    description: 'Job Description for Fitter of aluminium exterior carpentry. Install aluminum windows, doors, and facades in construction projects.',
    numberOfPositions: 2,
    salaryRange: '€3,060 Net',
    nationality: 'TCN with Work Permit / EU Nationals',
    status: 'Open',
    category: 'Construction - Carpentry',
    priority: 'High',
    country: 'Belgium',
    closingDate: '08/10/2025',
    benefits: 'Accommodation Provided'
  },
  // Czech Republic
  {
    id: 'cz-1',
    position: 'Long-haul Truck Driver',
    company: 'International Transport',
    description: 'Job Description for Long Haul Truck Driver. Drive long-distance routes across Europe, maintain driving logs, ensure cargo safety. Mandatory: Code 95 Paper, C+E License.',
    numberOfPositions: 20,
    salaryRange: '€2,000 - €2,500',
    nationality: 'TCN with Work Permit / EU Nationals',
    status: 'Open',
    category: 'Transportation',
    priority: 'High',
    country: 'Czech Republic',
    closingDate: '08/10/2025',
    benefits: 'Not Provided',
    remark: 'Mandatory: Code 95 Paper, C+E License'
  }
];

export function JobListingsDialog({ destination, open, onOpenChange }: JobListingsDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);

  // Determine which job list to use based on destination
  const isMiddleEast = destination === 'UAE';
  const isEurope = destination === 'Europe';
  const jobs = isMiddleEast ? middleEastJobs : isEurope ? europeanJobs : [];

  // Get unique categories and countries
  const categories = ['all', ...Array.from(new Set(jobs.map(job => job.category)))];
  const countries = ['all', ...Array.from(new Set(jobs.map(job => job.country)))];

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    const matchesCountry = countryFilter === 'all' || job.country === countryFilter;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setResumeDialogOpen(true);
  };

  const handleResumeDialogClose = () => {
    setResumeDialogOpen(false);
    // Don't clear selectedJob immediately to prevent flashing
    setTimeout(() => setSelectedJob(null), 300);
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Urgent':
        return 'bg-red-500 text-white';
      case 'Closing Soon':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-black">
              {isMiddleEast 
                ? `${destination} - Kuwait & Dubai Opportunities`
                : `${destination} - European Job Opportunities`
              }
            </DialogTitle>
            <DialogDescription>
              {isMiddleEast
                ? 'Browse available positions in Kuwait and Dubai. All positions close on October 15, 2025.'
                : 'Browse available positions across Netherlands, Germany, Sweden, Austria, Belgium, and Czech Republic. Opportunities in construction, transportation, hospitality, and skilled trades. Most positions close on October 8, 2025.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Search and Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by position, company, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country === 'all' ? 'All Countries' : country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[280px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <Briefcase className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2">
              <AnimatePresence mode="popLayout">
                {filteredJobs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <Briefcase className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500">No positions found matching your criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryFilter('all');
                        setCountryFilter('all');
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {filteredJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="p-5 hover:shadow-lg transition-all duration-300 border-2 hover:border-[#FBBE3C]/30">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h4 className="text-black">{job.position}</h4>
                                    <Badge className={getStatusColor(job.status)}>
                                      {job.status}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {job.country}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2 mb-2">
                                    {job.companyUrl ? (
                                      <a 
                                        href={job.companyUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-600 hover:text-[#FBBE3C] transition-colors flex items-center gap-1 group"
                                      >
                                        <Building2 className="w-3.5 h-3.5" />
                                        {job.company}
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </a>
                                    ) : (
                                      <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <Building2 className="w-3.5 h-3.5" />
                                        {job.company}
                                      </p>
                                    )}
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    {job.category}
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                {job.description}
                              </p>

                              {job.benefits && (
                                <div className="mb-3 p-2 bg-green-50 rounded text-xs text-green-800 border border-green-200">
                                  <span className="font-medium">Benefits: </span>{job.benefits}
                                </div>
                              )}

                              {job.remark && (
                                <div className="mb-3 p-2 bg-blue-50 rounded text-xs text-blue-800 border border-blue-200">
                                  <span className="font-medium">Note: </span>{job.remark}
                                </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <DollarSign className="w-4 h-4 text-[#FBBE3C]" />
                                  <span>{job.salaryRange}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Users className="w-4 h-4 text-[#FBBE3C]" />
                                  <span>{job.numberOfPositions} {job.numberOfPositions === 1 ? 'Position' : 'Positions'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <CalendarClock className="w-4 h-4 text-[#FBBE3C]" />
                                  <span className="text-xs">Closes: {job.closingDate}</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-600 sm:col-span-2 lg:col-span-3">
                                  <MapPin className="w-4 h-4 text-[#FBBE3C] mt-0.5 flex-shrink-0" />
                                  <span className="text-xs">{job.nationality}</span>
                                </div>
                              </div>
                            </div>

                            <Button
                              onClick={() => handleApply(job)}
                              className="bg-[#FBBE3C] hover:bg-[#e5ab35] text-black w-full lg:w-auto group/btn"
                            >
                              Apply Now
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resume Upload Dialog */}
      {selectedJob && (
        <ResumeUploadDialog
          destination={{
            name: `${selectedJob.country} - ${destination}`,
            sector: selectedJob.category,
            description: `${selectedJob.position} at ${selectedJob.company}`,
            jobDetails: {
              position: selectedJob.position,
              company: selectedJob.company,
              salaryRange: selectedJob.salaryRange,
              jobId: selectedJob.id
            }
          }}
          open={resumeDialogOpen}
          onOpenChange={handleResumeDialogClose}
        />
      )}
    </>
  );
}
