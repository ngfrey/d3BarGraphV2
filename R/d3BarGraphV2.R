#' d3BarGraph Version 2...putting the plotting function inside of HTMLWidgets.widget
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
d3BarGraphV2 <- function(message, width = NULL, height = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd3BarGraphV2',
    x,
    width = width,
    height = height,
    package = 'd3BarGraphV2'
  )
}

#' Shiny bindings for d3BarGraphV2
#'
#' Output and render functions for using d3BarGraphV2 within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a d3BarGraphV2
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name d3BarGraphV2-shiny
#'
#' @export
d3BarGraphV2Output <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'd3BarGraphV2', width, height, package = 'd3BarGraphV2')
}

#' @rdname d3BarGraphV2-shiny
#' @export
renderD3BarGraphV2 <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, d3BarGraphV2Output, env, quoted = TRUE)
}
