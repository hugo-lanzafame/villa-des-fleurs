import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import '../../styles/loginStyle.scss';
import '../../styles/globalStyle.scss';
import PropTypes from "prop-types";

/**
 * Custom form component used in the LoginPage.
 *
 * @param {Object} props - The component props.
 * @param {string} props.titleText - The text for the form title.
 * @param {function} props.handleSubmit - The function to handle form submission.
 * @param {Array<JSX.Element>} props.fieldArray - The array of LoginInput components to display in the form.
 * @param {string} props.buttonText - The text for the form submit button.
 * @returns {JSX.Element} The CustomForm component.
 */
const CustomForm = ({titleText, handleSubmit, fieldArray, buttonText}) => {
    return (
        <Box className="custom-form">
            <Typography variant="h2" className="custom-form__title">{titleText}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container className="custom-form__field-container">
                    {fieldArray.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                    <Grid item>
                        <Button type="submit" variant="contained" className="custom-form__button">
                            {buttonText}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
CustomForm.propTypes = {
    titleText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fieldArray: PropTypes.arrayOf(PropTypes.element).isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default CustomForm;
