// src/utils/parser.js
export function parseEmail(text) {
    const lines = text.split(/\r?\n/);
    const items = [];
    let address = "", deadline = "";
    let addressLines = [];
    
    // Regex for item lines (quantity first)
    const regex1 = /(\d+)\s*(?:x|pcs|pcs\.|pieces|units)?\s*[:-]?\s*(?:of\s+)?([\wÄÖÜäöüß]+\s+[\wÄÖÜäöüß]+ \d+)/gi;
    // Regex for item lines (quantity after product, e.g. "Loveseat ... – need 7 pcs")
    const regex2 = /([\wÄÖÜäöüß]+\s+[\wÄÖÜäöüß]+ \d+)\s*[-–]\s*need\s*(\d+)\s*(?:pcs|pieces)?/gi;
    // Regex for address lines
    const addressKeywords = /^(Ship to:|Send to:|Do deliver to:|deliver to:)/i;
    // Regex for deadline
    const dateRegex = /(by|Before|before|Deadline):?\s*([A-Za-z]+\s+\d{1,2},\s*\d{4})/i;
    
    for (let line of lines) {
      // Parse items with quantity first
      let match;
      regex1.lastIndex = 0;
      if ((match = regex1.exec(line))) {
        const qty = parseInt(match[1], 10);
        const name = match[2].trim();
        items.push({ quantity: qty, name, confidence: { quantity: 1.0, name: 0.9 } });
        continue;
      }
      // Parse items with quantity after the dash
      regex2.lastIndex = 0;
      if ((match = regex2.exec(line))) {
        const name = match[1].trim();
        const qty = parseInt(match[2], 10);
        items.push({ quantity: qty, name, confidence: { quantity: 1.0, name: 0.9 } });
        continue;
      }
      // Check for address lines
      if (addressKeywords.test(line)) {
        // Everything after colon is address start, or get next lines if multiline
        const parts = line.split(/:/);
        if (parts[1]) addressLines.push(parts[1].trim());
        continue;
      }
      // If previous line was address keyword, accumulate address lines
      if (addressLines.length > 0 && line.trim() !== "") {
        addressLines.push(line.trim());
        continue;
      }
      // Check for date/deadline
      let dateMatch = dateRegex.exec(line);
      if (dateMatch) {
        deadline = dateMatch[2].trim();
      }
    }
    
    address = addressLines.join(', ');
    
    return {
      items,
      address: address,
      deadline: deadline,
      confidence: {
        address: address ? 0.9 : 0.0,
        deadline: deadline ? 1.0 : 0.0
      }
    };
  }