import PropTypes from 'prop-types'
import Button from './button';

const Header = ({title,onAdd,btnText}) => {
    return(
        <header className='header'>
           <h1>{title}</h1>
           <Button onClick={onAdd} color={btnText ? 'Red' : 'Green'} text={btnText ? 'Close' : 'Open' }/>
        </header>
    )
}

//css in JS
// const headingStyle = {
//     color : 'red',
//     backgroundColor:'black'
// }

Header.defaultProps= {
    title : "Task Tracker"
}

//validations for the types
Header.propTypes={
    title : PropTypes.string.isRequired
}

 export default Header
