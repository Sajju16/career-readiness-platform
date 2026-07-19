import httpx
import fitz  # PyMuPDF
import re

async def extract_text_from_url(pdf_url: str) -> str:
    """
    Downloads the PDF from a signed URL and extracts its text.
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(pdf_url)
        response.raise_for_status()
        pdf_bytes = response.content

    # Open PDF from bytes
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"
    
    # Clean text
    text = re.sub(r'\s+', ' ', text)
    return text.strip()
