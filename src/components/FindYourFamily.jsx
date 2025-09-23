import React from 'react'

const FindYourFamily = () => {
  return (
    <div>
       <div className="container my-5">
      <h2 className="text-center text-light mb-4">Family Tree</h2>

      <div className="d-flex justify-content-center">
        <ul className="list-unstyled text-center">
          {/* Grand Parents */}
          <li>
            <div className="p-3 bg-primary text-white rounded shadow">
              👴 Grandfather <br /> 👵 Grandmother
            </div>
            <ul className="list-unstyled d-flex justify-content-center gap-4 mt-3">
              {/* Parents */}
              <li>
                <div className="p-3 bg-success text-white rounded shadow">
                  👨 Father <br /> 👩 Mother
                </div>

                {/* Children */}
                <ul className="list-unstyled d-flex justify-content-center gap-4 mt-3">
                  <li>
                    <div className="p-3 bg-warning text-dark rounded shadow">
                      👦 Son
                    </div>
                  </li>
                  <li>
                    <div className="p-3 bg-warning text-dark rounded shadow">
                      👧 Daughter
                    </div>
                  </li>
                  <li>
                    <div className="p-3 bg-warning text-dark rounded shadow">
                      👦 Younger Son
                    </div>
                  </li>
                </ul>
              </li>

              {/* Parent’s Sibling (Uncle/Aunt) */}
              <li>
                <div className="p-3 bg-info text-dark rounded shadow">
                  👨 Uncle <br /> 👩 Aunt
                </div>

                {/* Their Children (Cousins) */}
                <ul className="list-unstyled d-flex justify-content-center gap-4 mt-3">
                  <li>
                    <div className="p-3 bg-danger text-white rounded shadow">
                      👦 Cousin 1
                    </div>
                  </li>
                  <li>
                    <div className="p-3 bg-danger text-white rounded shadow">
                      👧 Cousin 2
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default FindYourFamily
