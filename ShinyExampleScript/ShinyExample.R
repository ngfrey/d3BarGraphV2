library(shiny)
library(d3BarGraphV2)
numz<- round(((runif(20)*30)+1),0)
numz

ui <- fluidPage(
  h1("Example app"),
  sidebarLayout(
    sidebarPanel(
      numericInput("nobs", "Number of rows", 10)
    ),
    mainPanel(
      d3BarGraphV2Output("plot", width = '100%')
    )
  )
)

server <- function(input, output, session) {
  output$plot <- renderD3BarGraphV2({
    d3BarGraphV2(head(numz, input$nobs))
    #d3BarGraphV2::d3BarGraphV2(head(numz, input$nobs))
  })
}

shinyApp(ui, server, options=list(launch.browser=TRUE))
