import ProgressBar from 'react-bootstrap/ProgressBar';

export default function HPBar(props) {
    const variant = props.variant;
    const HP = props.HP

  
    return <ProgressBar animated variant={variant} now={HP} label={`${HP}%`} />;
}

