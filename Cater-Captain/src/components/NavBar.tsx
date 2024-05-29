
import './NavBar.css'; 
import { OutlineLightBlueButton } from './Buttons';


//nav bar component with logo and home button
export default function NavBar() {
    return (
        <div id="navDiv" className="nav-container">
            <img src='./src/assets/captainCaterLogoFinal.svg' alt='Cater-Captain Logo' width="120" />
            <h1 id="navTitle">Cater-Captain</h1>
            <OutlineLightBlueButton>Home</OutlineLightBlueButton>
            
        </div>
    )
}