import { FileText, CreditCard, HeartPulse, Building, Car, GraduationCap } from 'lucide-react';
import './ServiceQuickLinks.css';

const services = [
  { icon: FileText, title: 'National ID' },
  { icon: CreditCard, title: 'Income Tax' },
  { icon: HeartPulse, title: 'Health Records' },
  { icon: Building, title: 'Land & Property' },
  { icon: Car, title: 'Transport & License' },
  { icon: GraduationCap, title: 'Education' },
];

const ServiceQuickLinks = ({ onServiceClick }) => {
  return (
    <div className="quick-links-container animate-fade-in">
      <h2 className="quick-links-title">Popular Services</h2>
      <div className="quick-links-grid">
        {services.map((service, idx) => (
          <button 
            key={idx} 
            className="service-card glass-panel"
            onClick={() => onServiceClick(service.title)}
          >
            <service.icon className="service-icon" size={24} />
            <span className="service-title">{service.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceQuickLinks;
