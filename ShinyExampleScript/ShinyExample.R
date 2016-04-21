library(shiny)
library(d3BarGraphV2)
numz<- round(((runif(20)*30)+1),0)
numz

ui <- fluidPage(
  h1("Example D3 Application in Shiny"),
  sidebarLayout(
    sidebarPanel(
      numericInput("nobs", "Number of observations to use", 10)
    ),
    mainPanel(
      d3BarGraphV2Output("plot", width = '100%')
    )
  )
)

server <- function(input, output, session) {
  output$plot <- renderD3BarGraphV2({
    d3BarGraphV2(head(numz, input$nobs))
  })
}

shinyApp(ui, server, options=list(launch.browser=TRUE))
