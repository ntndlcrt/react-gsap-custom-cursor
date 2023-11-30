"use client"

import React, { useRef, useState, useEffect } from "react"
import gsap from "gsap"

import "./Cursor.css"

export default function Cursor() {
  const refCursor = useRef(null)
  const [cursorText, setCursorText] = useState(null)
  const state = {
    stick: null,
    visible: false,
    pos: {
      x: 0,
      y: 0,
    },
  }
  const options = {
    speed: 0.7,
    ease: "expo.out",
    visibleTimeout: 300,
  }

  const _bind = () => {
    document.body.addEventListener("mouseleave", () => {
      _hide()
    })

    document.body.addEventListener("mouseenter", () => {
      _show()
    })

    document.body.addEventListener("mousemove", (e) => {
      state.pos = {
        x: state.stick
          ? state.stick.x - (state.stick.x - e.clientX) * 0.15
          : e.clientX,
        y: state.stick
          ? state.stick.y - (state.stick.y - e.clientY) * 0.15
          : e.clientY,
      }
      _update()
    })

    document.body.addEventListener("mousedown", () => {
      _setState("--active")
    })

    document.body.addEventListener("mouseup", () => {
      _removeState("--active")
    })

    Array.from(
      document.body.querySelectorAll("a, input, textarea, button")
    ).forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        _setState("--pointer")
      })

      el.addEventListener("mouseleave", (e) => {
        _removeState("--pointer")
      })
    })

    Array.from(document.body.querySelectorAll("[data-cursor]")).forEach(
      (el) => {
        el.addEventListener("mouseenter", () => {
          const classes = el.dataset.cursor.split(" ")
          classes.forEach((c) => {
            _setState(c)
          })
        })

        el.addEventListener("mouseleave", () => {
          const classes = el.dataset.cursor.split(" ")
          classes.forEach((c) => {
            _removeState(c)
          })
        })
      }
    )

    Array.from(document.body.querySelectorAll("iframe")).forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        _hide()
      })

      el.addEventListener("mouseleave", (e) => {
        _show()
      })
    })

    Array.from(document.body.querySelectorAll("[data-cursor-text]")).forEach(
      (el) => {
        el.addEventListener("mouseenter", () => {
          _setText(el.dataset.cursorText)
        })

        el.addEventListener("mouseleave", () => {
          _removeText()
        })
      }
    )

    Array.from(document.body.querySelectorAll("[data-cursor-stick]")).forEach(
      (el) => {
        el.addEventListener("mouseenter", () => {
          _setStick(el.dataset.cursorStick)
        })

        el.addEventListener("mouseleave", () => {
          _removeStick()
        })
      }
    )
  }

  const _move = async (x, y, duration) => {
    gsap.to(refCursor.current, {
      x: x || state.pos.x,
      y: y || state.pos.y,
      force3D: true,
      overwrite: true,
      ease: options.ease,
      duration: state.visible ? duration || options.speed : 0,
    })
  }

  const _show = () => {
    if (state.visible) return
    refCursor.current.classList.add("--visible")
    setTimeout(() => (state.visible = true), options.visibleTimeout)
  }

  const _hide = () => {
    refCursor.current.classList.remove("--visible")
    setTimeout(() => (state.visible = false), options.visibleTimeout)
  }

  const _setState = (state) => {
    refCursor.current.classList.add(state)
  }

  const _removeState = (state) => {
    refCursor.current.classList.remove(state)
  }

  const _setText = (text) => {
    setCursorText(text)
    refCursor.current.classList.add("--text")
  }

  const _removeText = () => {
    refCursor.current.classList.remove("--text")
    setTimeout(() => setCursorText(null), options.visibleTimeout)
  }

  const _setStick = (el) => {
    const target = document.getElementById(el)
    const bound = target.getBoundingClientRect()

    state.stick = {
      y: bound.top + target.offsetHeight / 2,
      x: bound.left + target.offsetWidth / 2,
    }

    _move(state.stick.x, state.stick.y, 5)
  }

  const _removeStick = () => {
    state.stick = null
  }

  const _update = () => {
    _move()
    _show()
  }

  useEffect(() => {
    _bind()
    _move(-window.innerWidth, -window.innerHeight, 0)
  }, [])

  return (
    <div ref={refCursor} className="cursor">
      <span className="cursor__text">{cursorText}</span>
    </div>
  )
}
