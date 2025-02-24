const handleInputChange = (key, value, setState) => {
    setState((prevValues) => ({ 
        ...prevValues, 
        [key]: value
     }));
};

export { handleInputChange }