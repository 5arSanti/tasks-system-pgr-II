const handleAdmin = (user, setAdmin) => {
    if (user.rol_id === 1) {
        setAdmin(true);
        return;
    }
    setAdmin(false);
}

export { handleAdmin };