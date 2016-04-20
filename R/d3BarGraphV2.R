#' d3BarGraph Version 2...putting the plotting function inside of HTMLWidgets.widget
#'
#' <Add Description>
#' @param x a numerical list of values. Used for bar height
#' @param height numeric height for the graph's height in pixels.
#' @param width numeric width for the graph's width in pixels.
#'
#' @import htmlwidgets
#'
#' @export
d3BarGraphV2 <- function(x, width = NULL, height = NULL) {
  
  df<- data.frame(x=x)
  options<- list(width=width, height=height)

  # forward options using x
  x = list(
    data = df, options=options
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd3BarGraphV2',
    x,
    width = width,
    height = height,
    sizingPolicy = htmlwidgets::sizingPolicy(
      viewer.padding = 0,
      viewer.paneHeight = 500,
      browser.fill = TRUE
    ),
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
#'   \code{'600px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a d3BarGraphV2
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name d3BarGraphV2-shiny
#'
#' @export
d3BarGraphV2Output <- function(outputId, width = '100%', height = '600px'){
  shinyWidgetOutput(outputId, 'd3BarGraphV2', width, height, package = 'd3BarGraphV2')
}

#' @rdname d3BarGraphV2-shiny
#' @export
renderD3BarGraphV2 <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, d3BarGraphV2Output, env, quoted = TRUE)
}
