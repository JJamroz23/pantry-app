const FormInput = ({ label, ...otherProps }) => {
  return (
    <div>
      <input {...otherProps} />
      <label>{label}</label>
    </div>
  );
};

export default FormInput;
