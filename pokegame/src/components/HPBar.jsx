import ProgressBar from 'react-bootstrap/ProgressBar';

export default function HPBar(props) {
    const variant = props.variant
    const HP = props.HP
    const label = props.label
    const pokemon = label

  
    return <ProgressBar animated variant={variant} now={HP} label={`${pokemon} ${HP}%`} />;
}

