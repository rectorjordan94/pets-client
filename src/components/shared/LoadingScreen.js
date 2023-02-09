import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = () => (
    <div className="container-sm" style={{ textAlign: 'center' }}>
        <Spinner role='status' animation='border'>/</Spinner>
    </div>
)

export default LoadingScreen