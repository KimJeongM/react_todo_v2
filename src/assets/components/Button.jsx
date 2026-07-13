function Button({
    size = 'mid', 
    color = 'default', 
    shape = 'default', 
    variant = 'solid', 
    active = false,
    disabled = false,
    children, 
    onClick, 
    ariaLable, 
    className='',
})
{
    const classes = [
        'btn', 
        size ==='lar' && 'lar', 
        color !== 'default' && color,
        shape == 'circle' && 'circle', 
        variant === 'outline' && 'outline', 
        active && 'active'
    ].filter(Boolean).join(' '); 

    return(
         <button 
            type="button" 
            className={`${classes} ${className}` }
            disabled={disabled}
            aria-label={ariaLable}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    )
}

export default Button