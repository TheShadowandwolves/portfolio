// Footer, thank you for visiting and social links

function Footer() {
    let language = localStorage.getItem("language") || "en";
    let thankYou = language === "de" ? "Danke für Ihren Besuch!" : "Thank you for visiting!";
    return (
        <footer>
            <p>{thankYou}</p>
            <div className="social-links">
                <a href="https://github.com/theshadowandwolves">GitHub</a>
                <a href="https://www.linkedin.com/in/leonard-blam/">LinkedIn</a>
                <a href="https://instagram.com/theshadowandwolves">Instagram</a>
            </div>
        </footer>
    );
}
export default Footer;