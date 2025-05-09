import NavButton from '../NavButton'
import './404.scss'

function Error404() {

    return (
        <>
            <main className='wrapper-error'>
                <h1>Error 404</h1>
                <p>page not found</p>
                <NavButton
                    to="/"
                    text="Go Home"
                />

            </main>
        </>
    )
}

export default Error404