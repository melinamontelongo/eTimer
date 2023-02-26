const UnsplashCredit = ({ color, photographer }) => {
    return (
        <div className="font-pixel mt-5" style={{ color: color }}>
            <p>Photo by <a className="underline" href={`https://unsplash.com/@${photographer}?utm_source=eTimer&utm_medium=referral`}>{photographer}</a> on <a className="underline" href="https://unsplash.com/?utm_source=eTimer&utm_medium=referral">Unsplash</a></p>
        </div>
    )
}

export default UnsplashCredit;