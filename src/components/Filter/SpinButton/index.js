import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import cn from "classnames"
import styles from "components/Filter/SpinButton/SpinModule.module.sass"

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 500));
}

const SpinButton = ({
                      title = '[title]',
                      loadingTitle = '[loading-title]',
                      variant = 'outline-info',
                      onClick,
                      className = ''
                    }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <Button
      variant={variant}
      onClick={() => {
        onClick()
        !isLoading && setLoading(true)
      }}
      className={cn(styles.btn, className, "mb-2")}
    >
      {isLoading ? (
        loadingTitle
      ) : (
        title
      )}
    </Button>
  )
}

export default SpinButton