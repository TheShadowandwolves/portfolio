import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Fragment, useState } from 'react';
import Pulse from '../components/Pulse';
import { db} from '../config/firebase';
import { addDoc, collection} from "firebase/firestore";

const MessageCollectionRef = collection(db, "Messages");
async function saveForm({na, em, sub, mes}:{na : string, em: string, sub: string, mes: string}){
    try{
        const newMessage = {
            na,
            em,
            sub,
            mes,
            createdAt: new Date,
        }
        await addDoc(MessageCollectionRef, newMessage);
    }catch (err){
        console.error(err);
    }
}

function Contact() {
  const language = (localStorage.getItem("language") || "en") as "en" | "de";
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setAlertType('error');
      setAlertMessage(language === "de" ? "Bitte füllen Sie alle Felder aus." : "Please fill in all fields.");
      setAlertVisible(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertType('error');
      setAlertMessage(language === "de" ? "Bitte geben Sie eine gültige E-Mail ein." : "Please enter a valid email.");
      setAlertVisible(true);
      return;
    }

    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    try{
        saveForm({na: formData.name,em: formData.email,sub: formData.subject,mes: formData.message});
    } catch (err){
        console.error(err);
        setAlertType('error');
        setAlertMessage(language === "de" ? "Nachricht fehlgeschlagen!" : "Message unsuccessful!");
        setAlertVisible(true);
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
    }
    
    
    setAlertType('success');
    setAlertMessage(language === "de" ? "Nachricht erfolgreich gesendet!" : "Message sent successfully!");
    setAlertVisible(true);
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Fragment>
      <Header />
      {alertVisible && 
        <Alert type={alertType} onClose={() => setAlertVisible(false)}>
          {alertMessage}
        </Alert>
      }
      <main>
        <section id="contact">
          <div className="contact-header">
            <h2>{language === "de" ? "Kontakt" : "Contact"}</h2>
            <p>{language === "de" ? "Hinterlassen Sie mir eine Nachricht und ich werde Sie so bald wie möglich kontaktieren." : "Leave me a message and I'll get back to you as soon as possible."}</p>
          </div>

          <div className="contact-container">
            <div className="contact-info">
              <div className="info-item">
                <h3>📧 Email</h3>
                <a href="mailto:your-email@example.com">leonard.blam@gmail.com</a>
              </div>
              <div className="info-item">
                <h3>📱 Phone</h3>
                <a href="tel:+41123456789">+41 78 400 8547</a>
              </div>
              <div className="info-item">
                <h3>📍 Location</h3>
                <p>Basel, Switzerland</p>
              </div>
              <div className="info-item">
                <h3>{language === "de" ? "🔗 Verbindungen" : "🔗 Connect"}</h3>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/leonard-blam/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com/theshadowandwolves" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{language === "de" ? "Name" : "Name"}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={language === "de" ? "Ihr Name" : "Your name"}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{language === "de" ? "E-Mail" : "Email"}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={language === "de" ? "Ihre E-Mail" : "Your email"}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{language === "de" ? "Betreff" : "Subject"}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={language === "de" ? "Betreff" : "Subject"}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{language === "de" ? "Nachricht" : "Message"}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={language === "de" ? "Ihre Nachricht" : "Your message"}
                  rows={6}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                {language === "de" ? "Senden" : "Send"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <Pulse />
    </Fragment>
  );
}

export default Contact;