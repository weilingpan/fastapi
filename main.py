import uvicorn
from typing import Optional
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

from routers import router1

templates = Jinja2Templates(directory="frontend/templates")

app = FastAPI(title="ReginaAPI", description='regina api')
app.include_router(router1.router)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")


@app.get("/")
def hello_world():
    return {"Hello": "World"}

@app.get("/async_hello")
async def async_hello_world():
    return {"asyncHello": "World"}

@app.get("/welcome/{who}")
def welcome(who:str, q:Optional[str]=None):
    return {"who": who, "q": q}

@app.get("/path_param_example/{pID}") # 路徑中包含參數，屬於 Path Parameter
async def path_param_example(pID: str):
    return {"user": pID}

@app.get("/query_param_example") # 路徑中不包含參數，屬於 Query Parameter
async def query_param_example(pID: str):
    return {"user": pID}

#=========================== html ===========================
@app.get("/home")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
    

if __name__ == "__main__":
    uvicorn.run(app, port=8080, host='0.0.0.0')

# uvicorn main:app --reload
# uvicorn <檔名>:<app名稱>