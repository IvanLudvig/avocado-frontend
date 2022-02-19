import { red } from "@material-ui/core/colors";
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d4f1f4',
        },
        secondary: {
            main: '#189ab4',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        }
    }
});


export default theme;