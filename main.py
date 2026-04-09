from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import random
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Content Strategy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StrategyRequest(BaseModel):
    niche: str
    goal: str
    platform: str

class ContentIdea(BaseModel):
    title: str
    description: str
    format: str
    priority: str

@app.post("/generate-strategy", response_model=List[ContentIdea])
async def generate_strategy(req: StrategyRequest):
    # Mock AI Logic: In production, this would call OpenAI/Anthropic
    formats = ["Video Reel", "Carousel", "Long-form Article", "Thread", "Newsletter"]
    priorities = ["High", "Medium", "Low"]
    
    templates = [
        {"title": f"Ultimate Guide to {req.niche}", "desc": f"An educational deep dive focused on {req.goal}."},
        {"title": f"5 Common Mistakes in {req.niche}", "desc": "Common pitfalls and how to avoid them."} ,
        {"title": f"{req.niche} Transformation Journey", "desc": f"Case study showing results related to {req.goal}."},
        {"title": f"Future Trends: {req.niche} 2025", "desc": "Predictive analysis and industry shifts."},
        {"title": f"Behind the Scenes: {req.niche} Workflow", "desc": "Transparency-building content for the audience."}
    ]

    results = []
    for item in templates:
        results.append(ContentIdea(
            title=item["title"],
            description=item["desc"],
            format=random.choice(formats),
            priority=random.choice(priorities)
        ))
    
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)