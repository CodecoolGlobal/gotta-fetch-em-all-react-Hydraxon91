import ProgressBar from 'react-bootstrap/ProgressBar';

export default function HPBar(props) {
    const variant = props.variant
    const HP = props.HP
    const label = props.label

    return <ProgressBar className="hpbar" animated variant={variant} now={HP} label={`${label} ${HP}%`} />;
}

