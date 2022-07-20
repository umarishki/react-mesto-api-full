import Form from './Form';

function Login({ handleLogin }) {

    const handleSubmitForm = (e, formValues) => {
        e.preventDefault();
        const { password, email } = formValues;
        if (!password || !email){
            return;
        }
        handleLogin(formValues);
    };

    return (
        <section className="login">
            <Form 
                title={'Вход'} 
                buttonTitle={'Войти'}
                handleSubmitForm={handleSubmitForm}
            />
        </section>
    )
}

export default Login;