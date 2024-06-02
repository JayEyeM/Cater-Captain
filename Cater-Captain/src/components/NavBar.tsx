import { Link } from 'react-router-dom';
import './NavBar.css'; 
import { OutlineLightBlueButton } from './Buttons';
import { OutlineLightRedButton } from './Buttons';
import ToggleColorModeButton from './ToggleColorModeButton';


//nav bar component with logo and home button
export default function NavBar({ buttonText, buttonLink }: { buttonText: string, buttonLink: string }) {
    return (
        <div id="navDiv" className="nav-container">
            <img src='./src/assets/captainCaterLogoFinal.svg' alt='Cater-Captain Logo' width="120" />
            <h1 id="navTitle">Cater-Captain</h1>
            <ToggleColorModeButton />
            <Link to={buttonLink}>
                <OutlineLightBlueButton>
                    {buttonText}
                </OutlineLightBlueButton>
            </Link>
            <OutlineLightRedButton>
                Sign Out 
            </OutlineLightRedButton>
        </div>
    )
}