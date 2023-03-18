const Footer = () => {
    return (
        <>
            <div className="triangle-up border-b-base-300" />
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © Tim Jefferson { new Date().getFullYear() }</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;