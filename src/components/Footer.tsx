// Footer, thank you for visiting and social links

function Footer({language}: {language: string}) {
    let thankYou = language === "de" ? "Danke für Ihren Besuch!" : "Thank you for visiting!";
    return (
        <footer>
            <p>{thankYou}</p>
            <div className="social-links">
                <a href="https://github.com/yourusername">GitHub</a>
                <a href="https://linkedin.com/in/yourusername">LinkedIn</a>
                <a href="https://instagram.com/yourusername">Instagram</a>
            </div>
        </footer>
    );
}
export default Footer;