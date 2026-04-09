from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import random

app = FastAPI(title="AI Content Strategy Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StrategyRequest(BaseModel):
    niche: str
    audience: str
    goal: str

class ContentItem(BaseModel):
    day: int
    topic: str
    format: str
    objective: str

class StrategyResponse(BaseModel):
    strategy_name: str
    pillars: List[str]
    schedule: List[ContentItem]

@app.get("/")
def read_root():
    return {"status": "online", "message": "AI Content Strategy Engine Ready"}

@app.post("/api/generate-strategy", response_model=StrategyResponse)
async def generate_strategy(req: StrategyRequest):
    if not req.niche:
        raise HTTPException(status_code=400, detail="Niche is required")
    
    pillars = [
        f"Educational insights for {req.audience}",
        f"Behind-the-scenes of {req.niche}",
        f"Community building & engagement",
        f"Product/Service deep dives"
    ]
    
    formats = ["Short-form Video", "LinkedIn Carousel", "Blog Post", "Twitter Thread"]
    
    schedule = []
    for i in range(1, 8):
        schedule.append(ContentItem(
            day=i,
            topic=f"Mastering {req.niche}: Part {i}",
            format=random.choice(formats),
            objective=req.goal
        ))

    return StrategyResponse(
        strategy_name=f"The {req.niche} Growth Blueprint",
        pillars=pillars,
        schedule=schedule
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)