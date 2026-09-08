const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#0f172a',
            color: '#94a3b8',
            padding: '30px 20px',
            textAlign: 'center',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            borderTop: '1px solid #1e293b',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center'
            }}>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#f8fafc' }}>
                    Bridging Learning software to real careers
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>
                    &copy; 2026 <span style={{ color: '#38bdf8', fontWeight: '600' }}>codebridge</span> academy. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;