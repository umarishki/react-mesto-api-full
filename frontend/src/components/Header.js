import logoMesto from '../images/logo-mesto.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ email, handleLogOut }) {
    return (
        <header className="header">
            <img className="header__image" src={logoMesto} alt="Лого: Mesto" />
            <div className="header__content">
                <Switch>
                    <Route exact path="/sign-in">
                        <Link to="/sign-up" className="header__link">
                            Регистрация
                        </Link>
                    </Route>
                    <Route exact path="/sign-up">
                        <Link to="/sign-in" className="header__link">
                            Войти
                        </Link>
                    </Route>
                    <Route exact path="/">
                        <p className="header__email">{email}</p>
                        <Link to='/sign-in' className="header__link" onClick={handleLogOut}>Выйти</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;